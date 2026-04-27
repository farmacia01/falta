
import os

filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'

# Lemos o arquivo e vamos reconstruir os blocos problemáticos
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Corrigir o bloco das Ofertas (Quick Price Dots)
# Estava assim (com erro): </div> </div> )}
# Deve ser: </div> )} </div>
# Vamos usar regex para encontrar o bloco e substituir
import re

# Consertando L359/360 aproximado
content = re.sub(r'</span>\s+</div>\s+</div>\s+\)}\s+</div>', 
                 r'</span>\n                      </div>\n                    )}\n                  </div>', content)

# Consertando L380/381 aproximado
content = re.sub(r'<AlertCircle size=\{14\} className="ml-auto text-\[var\(--text-muted\)\] opacity-20" />\s+</div>\s+\)}\s+</div>',
                 r'<AlertCircle size={14} className="ml-auto text-[var(--text-muted)] opacity-20" />\n                    )}\n                  </div>', content)

# Consertando o Modal Table (L479/480 aproximado)
content = re.sub(r'<span className="text-\[10px\] font-bold text-\[var\(--text-muted\)\] italic">Nenhuma oferta</span>\s+</div>\s+\)}\s+</td>',
                 r'<span className="text-[10px] font-bold text-[var(--text-muted)] italic">Nenhuma oferta</span>\n                                    )}\n                                 </td>', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("File reconstructed and balanced.")
