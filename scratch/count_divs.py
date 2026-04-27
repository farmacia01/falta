
import re

with open(r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

opens = len(re.findall(r'<div', content))
closes = len(re.findall(r'</div', content))

print(f"Opens: {opens}")
print(f"Closes: {closes}")
