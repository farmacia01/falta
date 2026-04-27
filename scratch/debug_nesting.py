
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
tokens = {
    '<div': 'div',
    '</div': '/div',
    '{': '{',
    '}': '}',
    '(': '(',
    ')': ')'
}

for i, line in enumerate(lines):
    # Encontrar todos os tokens na linha na ordem em que aparecem
    # Simplificando: vamos procurar por <div, </div, {, }, (, )
    import re
    # Regex para encontrar qualquer um dos tokens
    pattern = r'</div|<div|\{|\}|\(|\)'
    for m in re.finditer(pattern, line):
        t = m.group()
        if t in ['<div', '{', '(']:
            stack.append((t, i + 1))
        else:
            if not stack:
                print(f"EXTRA CLOSE '{t}' at line {i+1}")
                continue
            
            last_t, last_line = stack.pop()
            
            # Check match
            matches = {
                '</div': '<div',
                '}': '{',
                ')': '('
            }
            if matches[t] != last_t:
                print(f"MISMATCH: Found '{t}' at L{i+1} closing '{last_t}' from L{last_line}")
                # Put back to keep context if possible or just stop
                # stack.append((last_t, last_line))

if stack:
    print(f"UNCLOSED TOKENS: {stack}")
else:
    print("All tokens nested correctly.")
