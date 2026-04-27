
import re

with open(r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    opens = re.findall(r'<div\b', line)
    closes = re.findall(r'</div\b', line)
    if opens or closes:
        print(f"L{i+1}: {len(opens)} opens, {len(closes)} closes | {line.strip()}")
