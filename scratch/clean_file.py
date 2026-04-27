
import os
import re

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remover as inserções erradas do PowerShell:
# Procuramos por uma div de fechamento seguida por um fechamento de expressão que foi inserido indevidamente.
# No nosso caso, o PS adicionou uma div extra antes do )} em vários lugares.

# Vamos consertar os blocos específicos identificados:

# Bloco 1 (Ofertas):
content = content.replace('      </div>\n       )}', '      )}\n')
# Bloco 2 (AlertCircle):
content = content.replace('      </div>\n       )}', '      )}\n')
# Bloco 3 (Modal Table):
content = content.replace('       </div>\n       )}', '       )}\n')

# E garantir que o final do arquivo está limpo (o script anterior já ajudou, mas vamos garantir)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("File cleaned successfully.")
