
import re

with open(r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

opens_div = len(re.findall(r'<div\b', content))
closes_div = len(re.findall(r'</div\b', content))

print(f"Opens: {opens_div}")
print(f"Closes: {closes_div}")
