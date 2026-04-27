
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

opens = []
closes = []

for i, line in enumerate(lines):
    if '<div' in line:
        opens.append(i + 1)
    if '</div' in line:
        closes.append(i + 1)

print(f"Opens ({len(opens)}): {opens}")
print(f"Closes ({len(closes)}): {closes}")
