
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# L358 should be </div>, L359 should be )}
lines[357] = '                      </div>\n'
lines[358] = '                    )}\n'
lines[359] = '\n'

# L380 should be )}
lines[379] = '                    )}\n'
lines[380] = '\n'

# Modal Table (preciso encontrar as linhas)
for i, line in enumerate(lines):
    if 'Nenhuma oferta' in line:
        # A linha seguinte deve ser </div>
        # A próxima deve ser )}
        lines[i+1] = '                                    </div>\n'
        lines[i+2] = '                                 )}\n'
        break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("File fixed by index.")
