// Load a SKILL.md into an eval context: strip frontmatter, substitute $ARGUMENTS,
// inline referenced references/ and shared/ files, and add a harness note.

import type { RunMode } from "./types.ts";

const REPO = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");
const MAX_CONTEXT_KB = Number(process.env.EVAL_MAX_CONTEXT_KB ?? "60");

interface Frontmatter {
  name?: string;
  description?: string;
}

function splitFrontmatter(text: string): { fm: Frontmatter; body: string } {
  if (!text.startsWith("---")) return { fm: {}, body: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: text };
  const raw = text.slice(3, end);
  const body = text.slice(end + 4).replace(/^\n/, "");
  const fm: Frontmatter = {};
  const nameM = raw.match(/^name:\s*(.+)$/m);
  const descM = raw.match(/^description:\s*(.+)$/m);
  if (nameM) fm.name = nameM[1].trim();
  if (descM) fm.description = descM[1].trim();
  return { fm, body };
}

/** Collect repo-relative paths the body references (references/, shared/, skill-local references/). */
function referencedPaths(body: string, skill: string): string[] {
  const paths = new Set<string>();
  for (const m of body.matchAll(/(?:\.\.\/\.\.\/|\.\.\/)?(references|shared)\/[\w./-]+\.md/g)) {
    paths.add(m[0].replace(/^(\.\.\/)+/, ""));
  }
  for (const m of body.matchAll(/skills\/[\w-]+\/references\/[\w./-]+\.md/g)) {
    paths.add(m[0]);
  }
  // skill-local references dir, referenced by bare name
  return [...paths];
}

async function readIfExists(rel: string): Promise<string | null> {
  const f = Bun.file(`${REPO}/${rel}`);
  return (await f.exists()) ? await f.text() : null;
}

export interface SkillContext {
  name: string;
  description: string;
  systemPrompt: string;
  userPrompt: string;
}

export async function loadSkill(skill: string, prompt: string, mode: RunMode, roadmapFixture?: string): Promise<SkillContext> {
  // Core skills live in skills/; domain-plugin skills in plugins/<plugin>/skills/.
  let path = `skills/${skill}/SKILL.md`;
  let text = await readIfExists(path);
  if (text === null) {
    for (const plugin of ["sector137-studio", "sector137-crew", "sector137-brand", "sector137-ops"]) {
      const candidate = `plugins/${plugin}/skills/${skill}/SKILL.md`;
      text = await readIfExists(candidate);
      if (text !== null) {
        path = candidate;
        break;
      }
    }
  }
  if (text === null) throw new Error(`skill not found: ${path}`);
  const { fm, body } = splitFrontmatter(text);
  const withArgs = body.replaceAll("$ARGUMENTS", prompt);

  const parts: string[] = [withArgs];
  let budget = MAX_CONTEXT_KB * 1024 - withArgs.length;

  for (const rel of referencedPaths(body, skill)) {
    const content = await readIfExists(rel);
    if (content === null) continue;
    const block = `\n\n--- File: ${rel} ---\n${content}`;
    if (block.length > budget) {
      parts.push(`\n\n--- File: ${rel} (truncated — context budget reached) ---\n${content.slice(0, Math.max(0, budget))}`);
      break;
    }
    parts.push(block);
    budget -= block.length;
  }

  // Offline: inline the roadmap fixture so a disconnected skill has something to read.
  if (mode === "offline") {
    const roadmap =
      roadmapFixture ?? (await readIfExists("evals/runner/fixtures/roadmap.md")) ?? "(no roadmap fixture)";
    parts.push(`\n\n--- File: .sector137/roadmap.md ---\n${roadmap}`);
  }

  const harness = [
    "You are running inside an automated eval harness, not a live terminal.",
    "Any file contents you need are provided inline above as `--- File: … ---` blocks.",
    "Do NOT call Bash, Read, or other filesystem tools — they are unavailable here.",
    mode === "mcp"
      ? "The mcp__sector137__* and mcp__plugin_sector137-studio_studio__* tools ARE available; call them as the skill instructs."
      : "The MCP server is DOWN: no mcp__sector137__* or mcp__plugin_sector137-studio_studio__* tools are available. Follow the skill's offline path against the inlined .sector137/roadmap.md.",
    "Respond as the skill would to the user.",
  ].join(" ");

  return {
    name: fm.name ?? skill,
    description: fm.description ?? "",
    systemPrompt: `${parts.join("")}\n\n---\n[HARNESS] ${harness}`,
    userPrompt: prompt,
  };
}
