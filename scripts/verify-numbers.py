#!/usr/bin/env python3
"""
Pre-commit verification — scan all Peanut eSIM HTML files for stale numbers.

Catches the kind of bugs that have slipped through during iterative edits:
- Old Economy revenue ($5.99 vs verified $12.48)
- Old Business per-GB ($1.20/GB vs $2.00/GB)
- Cockpit pool 200 GB/yr (should be 144 GB)
- Old First/Suite negative contribution numbers
- Samurai mentions (should be "wholesale supplier")
- Emoji usage

Run before any commit:
    python3 scripts/verify-numbers.py
Exit code 0 = clean. Exit code 1 = stale numbers found, abort commit.
"""
import os
import re
import sys
import glob

DOCS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'downloads')
ROOT_INDEX = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'index.html')

# Each rule: (pattern, why_it_is_stale, severity)
# Severity: 'error' blocks commit. 'warn' just logs.
STALE_RULES = [
    # Old wholesale cost
    (r'\$1\.20\s*/\s*GB(?![^<]{0,40}payment processing)', 'Stale wholesale cost ($1.20/GB) — should be $1.34', 'error'),
    (r'\$2\.13\s*/\s*GB', 'Stale blended cost ($2.13) — should be $1.34', 'error'),

    # Old refuel price
    (r'(?<!\d)\$5\.99(?:\s|<)', 'Stale price ($5.99) — likely old Economy 1.2x or old refuel', 'warn'),

    # Old Economy 1.2 top-ups assumption
    (r'1\.2\s*top[- ]ups?(?:/mo|\s*per)', 'Stale Economy assumption (1.2 top-ups) — should be 2.5', 'error'),

    # Old Cockpit pool 200 GB/yr
    (r'200\s*GB\s*/\s*yr|200\s*GB\s*/\s*year', 'Stale Cockpit pool (200 GB/yr) — should be 144 GB/yr (12×12)', 'error'),

    # Old Cockpit lifetime
    (r'167\s*months?', 'Stale Cockpit lifetime (167 months) — should be 36 months', 'error'),

    # Old First / First Suite negative contribution claims
    (r'-\$0\.21', 'Stale First contribution (-$0.21) — should be +$28.05', 'error'),
    (r'-\$14\.33', 'Stale First Suite contribution (-$14.33) — should be +$33.03', 'error'),

    # Old First / First Suite pool sizes
    (r'50\s*GB\s*pool', 'Stale First pool (50 GB) — should be 25 GB', 'warn'),
    (r'80\s*GB\s*pool', 'Stale First Suite pool (80 GB) — should be 40 GB', 'warn'),

    # Old First / First Suite COGS
    (r'\$40\.20', 'Stale First COGS ($40.20) — should be $13.40', 'warn'),
    (r'\$64\.32', 'Stale First Suite COGS ($64.32) — should be $17.69', 'warn'),

    # Old geo mix
    (r'60\s*/\s*25\s*/\s*15(?!\s*\(old)', 'Stale geo mix (60/25/15) — should be 75/20/5', 'warn'),

    # Old Premium consumption %
    (r'54%\s*(?:consum|×|of pool|pool consumed)', 'Stale Premium consumption (54%) — should be 40%', 'warn'),

    # Per-GB on tier cards — must match verified pool-only values
    (r'\$0\.80\s*/\s*GB(?!.*old)', 'Stale First per-GB ($0.80) — should be $1.60 ($39.99/25 GB)', 'error'),
    (r'\$0\.63\s*/\s*GB(?!.*old)', 'Stale First Suite per-GB ($0.63) — should be $1.25 ($49.99/40 GB)', 'error'),

    # Wrong Business per-GB IF NOT in payment-processing context
    # (Tab 1 visualizer had Business "≈ $1.20/GB" which is wrong; the OPEX line "Payment processing $1.20" is OK)
    # Handled by the negative lookahead in the first rule already

    # Sanitization
    (r'\bSamurai\b', 'Supplier name not sanitized — use "wholesale supplier"', 'error'),

    # Emoji codepoints (excluding standard typographic arrows/checks)
    (r'[\U0001F300-\U0001FAFF\U00002600-\U000027BF]', 'Emoji found — replace with SVG icon or remove', 'error'),
]

# Files we expect to scan
HTML_PATTERNS = [
    os.path.join(DOCS_DIR, 'tab*.html'),
    os.path.join(DOCS_DIR, 'plan-*.html'),
    os.path.join(DOCS_DIR, '*-blueprint-*.html'),
    os.path.join(DOCS_DIR, '*-visualizer-*.html'),
    os.path.join(DOCS_DIR, '*-visual-explainer-*.html'),
    os.path.join(DOCS_DIR, '*-in-depth-report-*.html'),
    os.path.join(DOCS_DIR, 'index.html'),
    ROOT_INDEX,
]

# Allowlist patterns — content here is intentional context (e.g., "the OLD value was $X")
ALLOWLIST_CONTEXT = [
    r'historical', r'wrong before', r'OLD', r'old', r'stale', r'corrected', r'used to be',
    r'previously', r'prior version', r'rejected', r'incorrect', r'placeholder', r'PLACEHOLDER',
    r'aspirational', r'invalidated',
]
ALLOW_REGEX = re.compile('|'.join(ALLOWLIST_CONTEXT), re.IGNORECASE)


def get_context(content, position, window=80):
    """Return ~80 chars of context around a match position."""
    start = max(0, position - window)
    end = min(len(content), position + window)
    return content[start:end].replace('\n', ' ')


def scan_file(filepath):
    """Scan one file. Return list of (line_num, severity, message, context)."""
    findings = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return [(0, 'error', f'Could not read file: {e}', '')]

    lines = content.split('\n')

    for pattern, message, severity in STALE_RULES:
        compiled = re.compile(pattern)
        for match in compiled.finditer(content):
            context = get_context(content, match.start(), 100)

            # Skip if context contains an allowlist phrase (historical note, etc.)
            if ALLOW_REGEX.search(context):
                continue

            # Compute line number
            line_num = content[:match.start()].count('\n') + 1
            findings.append((line_num, severity, message, match.group(0), context.strip()))

    return findings


def main():
    print('Peanut eSIM — Pre-Commit Number Verification')
    print('=' * 70)

    all_files = set()
    for pattern in HTML_PATTERNS:
        all_files.update(glob.glob(pattern))

    if not all_files:
        print('No files matched. Check working directory.')
        sys.exit(1)

    total_errors = 0
    total_warnings = 0
    files_with_issues = 0

    for filepath in sorted(all_files):
        findings = scan_file(filepath)
        if not findings:
            continue
        files_with_issues += 1

        relative = filepath.replace(os.path.abspath(os.path.join(DOCS_DIR, '..', '..')) + '/', '')
        print(f'\n{relative}')
        print('-' * len(relative))

        for line, sev, msg, match_text, context in findings:
            icon = '[ERROR]' if sev == 'error' else '[warn]'
            print(f'  {icon} L{line}: {msg}')
            print(f'    Matched: "{match_text[:60]}"')
            print(f'    Context: ...{context[:120]}...')
            if sev == 'error':
                total_errors += 1
            else:
                total_warnings += 1

    print()
    print('=' * 70)
    print(f'Scanned: {len(all_files)} files')
    print(f'Files with issues: {files_with_issues}')
    print(f'Errors (block commit): {total_errors}')
    print(f'Warnings: {total_warnings}')

    if total_errors > 0:
        print('\nFAIL: stale numbers detected. Fix and re-run before committing.')
        sys.exit(1)
    else:
        print('\nPASS: all files clean.')
        sys.exit(0)


if __name__ == '__main__':
    main()
