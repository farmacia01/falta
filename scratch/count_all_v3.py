
import os
import re

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def count_tokens(text):
    # Regex para encontrar aberturas de div que NÃO terminam em /> na mesma tag
    # Usando uma abordagem mais simples: encontrar todas as tags, filtrar self-closing
    tags = re.findall(r'<div[^>]*>|</div>', text)
    opens = 0
    closes = 0
    for tag in tags:
        if tag.startswith('</'):
            closes += 1
        elif not tag.endswith('/>'):
            opens += 1
    
    braces_open = text.count('{')
    braces_close = text.count('}')
    parens_open = text.count('(')
    parens_close = text.count(')')
    
    return opens, closes, braces_open, braces_close, parens_open, parens_close

o, c, bo, bc, po, pc = count_tokens(content)
print(f"Divs: {o} / {c}")
print(f"Braces: {bo} / {bc}")
print(f"Parens: {po} / {pc}")
