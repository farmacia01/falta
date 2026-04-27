
import os
import re

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []

for i, line in enumerate(lines):
    # Encontrar todas as aberturas de div
    for m in re.finditer(r'<div', line):
        # Ignorar self-closing se houver (embora raro em div)
        if '/>' not in line[m.start():line.find('>', m.start())+2]:
            stack.append(i + 1)
    
    # Encontrar todos os fechamentos de div
    for m in re.finditer(r'</div', line):
        if stack:
            stack.pop()
        else:
            print(f"EXTRA CLOSE at line {i+1}")

if stack:
    print(f"UNCLOSED DIVS (line numbers): {stack}")
else:
    print("All divs balanced.")
