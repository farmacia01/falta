
filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Fragments Start: {content.count('<>')}")
print(f"Fragments End: {content.count('</>')}")
