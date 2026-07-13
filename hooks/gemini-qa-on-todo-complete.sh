#!/bin/bash

# Gemini-Powered QA Review on TODO Completion Hook
#
# This hook triggers after TodoWrite tool executes.
# It uses Gemini CLI to perform comprehensive code review, linting, and testing.
#
# Hook Event: PostToolUse
# Matcher: TodoWrite
#
# Input: JSON context via stdin containing:
#   - event: "PostToolUse"
#   - tool: "TodoWrite"
#   - tool_input: { todos: [...] }
#
# Exit Codes:
#   0 = Success (allow operation to continue)
#   1 = Non-blocking error (show to user)
#   2 = Blocking error (feed back to Claude)

# Read JSON context from stdin
context=$(cat)

# Extract tool name to verify this is TodoWrite
tool=$(echo "$context" | jq -r '.tool // empty')

# Only proceed if this is a TodoWrite operation
if [ "$tool" != "TodoWrite" ]; then
    exit 0
fi

# Parse the todos array from tool_input
todos_json=$(echo "$context" | jq -r '.tool_input.todos // empty')

# Check if we have valid todos data
if [ -z "$todos_json" ] || [ "$todos_json" = "null" ]; then
    exit 0
fi

# Find TODOs that were just marked as completed
completed_todos=$(echo "$todos_json" | jq -c '[.[] | select(.status == "completed")]')
completed_count=$(echo "$completed_todos" | jq 'length')

# If no completed todos, exit
if [ "$completed_count" -eq 0 ]; then
    exit 0
fi

# Check for code-related keywords that indicate implementation work
code_keywords="implement|fix|build|create|update|refactor|add|write|edit|modify|change"
skip_keywords="read|research|explore|review|investigate|plan|discuss|analyze"

needs_review=false
review_items=""

while IFS= read -r todo; do
    content=$(echo "$todo" | jq -r '.content // empty')
    active_form=$(echo "$todo" | jq -r '.activeForm // empty')

    # Check content for code keywords (excluding skip keywords)
    if echo "$content $active_form" | grep -iEq "$code_keywords"; then
        if ! echo "$content $active_form" | grep -iEq "^($skip_keywords)"; then
            needs_review=true
            review_items="$review_items- $content\n"
        fi
    fi
done < <(echo "$completed_todos" | jq -c '.[]')

# Exit if no code changes detected
if [ "$needs_review" != "true" ]; then
    exit 0
fi

# Check if Gemini CLI is available
if ! command -v gemini &> /dev/null; then
    echo ""
    echo "WARNING: Gemini CLI not found. Skipping AI-powered QA review."
    echo "Install with: npm install -g @google/gemini-cli"
    exit 0
fi

# Get project root (look for package.json or .git)
find_project_root() {
    local dir="$PWD"
    while [ "$dir" != "/" ]; do
        if [ -f "$dir/package.json" ] || [ -d "$dir/.git" ]; then
            echo "$dir"
            return
        fi
        dir=$(dirname "$dir")
    done
    echo "$PWD"
}

PROJECT_ROOT=$(find_project_root)
cd "$PROJECT_ROOT" || exit 0

echo ""
echo "========================================"
echo "Gemini-Powered QA Review"
echo "========================================"
echo ""
echo "Completed TODO(s):"
echo -e "$review_items"

# Initialize results tracking
LINT_PASSED=true
TYPECHECK_PASSED=true
TESTS_PASSED=true
GEMINI_REVIEW=""

# Step 1: Run linting (biome/eslint)
echo ""
echo "1. Running Linting..."
echo "----------------------------------------"
if [ -f "biome.json" ]; then
    if pnpm biome check . 2>&1 | head -50; then
        echo "Biome: PASSED"
    else
        LINT_PASSED=false
        echo "Biome: FAILED (issues found)"
    fi
fi

if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ]; then
    if pnpm lint 2>&1 | head -50; then
        echo "ESLint: PASSED"
    else
        LINT_PASSED=false
        echo "ESLint: FAILED (issues found)"
    fi
fi

# Step 2: Run TypeScript check
echo ""
echo "2. Running TypeScript Check..."
echo "----------------------------------------"
if [ -f "tsconfig.json" ]; then
    if npx tsc --noEmit 2>&1 | head -50; then
        echo "TypeScript: PASSED"
    else
        TYPECHECK_PASSED=false
        echo "TypeScript: FAILED (errors found)"
    fi
else
    echo "TypeScript: SKIPPED (no tsconfig.json)"
fi

# Step 3: Get recent git changes for Gemini review
echo ""
echo "3. Gemini Code Review..."
echo "----------------------------------------"

# Get recent changes (staged and unstaged)
RECENT_CHANGES=""
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Get diff of recent changes (last commit + working directory)
    RECENT_CHANGES=$(git diff HEAD~1 --stat 2>/dev/null | head -30)
    CHANGED_FILES=$(git diff HEAD~1 --name-only 2>/dev/null | head -20)
fi

if [ -n "$CHANGED_FILES" ]; then
    # Build a prompt for Gemini to review the changes
    REVIEW_PROMPT="Review these recently changed files for issues:

Files changed:
$CHANGED_FILES

Focus on:
1. Potential bugs or logic errors
2. Security vulnerabilities (XSS, injection, etc.)
3. Performance issues
4. Code quality improvements

Provide a concise summary (max 200 words). If everything looks good, say so briefly."

    # Run Gemini review with timeout and Flash model for speed
    GEMINI_REVIEW=$(timeout 30 gemini "$REVIEW_PROMPT" -m gemini-2.5-flash -o text 2>&1 | head -50)

    if [ $? -eq 0 ] && [ -n "$GEMINI_REVIEW" ]; then
        echo "$GEMINI_REVIEW"
    else
        echo "Gemini review skipped (timeout or rate limit)"
    fi
else
    echo "No recent changes to review"
fi

# Step 4: Run tests (if available)
echo ""
echo "4. Running Tests..."
echo "----------------------------------------"
if [ -f "package.json" ]; then
    # Check for test command in package.json
    if grep -q '"test"' package.json 2>/dev/null; then
        # Run with timeout to avoid hanging
        if timeout 120 pnpm test --passWithNoTests 2>&1 | tail -30; then
            echo "Tests: PASSED"
        else
            TESTS_PASSED=false
            echo "Tests: FAILED"
        fi
    else
        echo "Tests: SKIPPED (no test script found)"
    fi
fi

# Summary
echo ""
echo "========================================"
echo "QA Summary"
echo "========================================"
echo ""

ISSUES=""
if [ "$LINT_PASSED" != "true" ]; then
    ISSUES="$ISSUES- Linting issues found (run 'pnpm biome:fix' or 'pnpm lint --fix')\n"
fi
if [ "$TYPECHECK_PASSED" != "true" ]; then
    ISSUES="$ISSUES- TypeScript errors found\n"
fi
if [ "$TESTS_PASSED" != "true" ]; then
    ISSUES="$ISSUES- Test failures detected\n"
fi

if [ -z "$ISSUES" ]; then
    echo "All checks passed!"
else
    echo "Issues found:"
    echo -e "$ISSUES"
    echo ""
    echo "Please address these issues before proceeding."
fi

echo "========================================"

# Exit 0 to not block Claude Code, but output will be visible
exit 0
