
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# L479 is index 478
if '</div>' in lines[478] and ')}' in lines[479]:
    print(f"Removing rogue div at line 479")
    lines[478] = '                                     )}\n'
    lines[479] = '\n'

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("File fixed again.")
