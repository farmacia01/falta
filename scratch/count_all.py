
import re

with open(r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

def count_tokens(pattern, text):
    return len(re.findall(pattern, text))

opens_div = count_tokens(r'<div', content)
closes_div = count_tokens(r'</div', content)
opens_brace = count_tokens(r'\{', content)
closes_brace = count_tokens(r'\}', content)
opens_paren = count_tokens(r'\(', content)
closes_paren = count_tokens(r'\)', content)

print(f"Divs: {opens_div} / {closes_div}")
print(f"Braces: {opens_brace} / {closes_brace}")
print(f"Parens: {opens_paren} / {closes_paren}")
