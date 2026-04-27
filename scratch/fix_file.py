
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Encontrar o início do return JSX para garantir que estamos no lugar certo
# O arquivo original tinha cerca de 514-516 linhas.
# Vou reconstruir as últimas linhas a partir do botão "Sair da Tela Cheia"

new_lines = []
for line in lines:
    if 'Sair da Tela Cheia' in line:
        new_lines.append(line)
        # O botão termina aqui. Agora vamos adicionar os fechamentos corretos.
        new_lines.append('               </button>\n')
        new_lines.append('            </div>\n') # Fecha modal footer summary
        new_lines.append('         </div>\n')    # Fecha modal container
        new_lines.append('      )}\n')             # Fecha isFullscreen expression
        new_lines.append('    </div>\n')             # Fecha root div
        new_lines.append('  )\n')                  # Fecha return
        new_lines.append('}\n')                   # Fecha componente
        break
    else:
        new_lines.append(line)

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully.")
