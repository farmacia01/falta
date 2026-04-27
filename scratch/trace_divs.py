
import os
import re

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

opens = 0
closes = 0

for i, line in enumerate(lines):
    # Regex para tags completas ou aberturas
    # Encontrar todas as tags <div... e </div>
    tags = re.findall(r'<div[^>]*>|</div>', line)
    for tag in tags:
        if tag.startswith('</'):
            closes += 1
            # print(f"L{i+1}: CLOSE (Total {closes})")
        elif not tag.endswith('/>'):
            opens += 1
            # print(f"L{i+1}: OPEN (Total {opens})")

print(f"Total Opens: {opens}")
print(f"Total Closes: {closes}")
