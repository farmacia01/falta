
filepath = r'c:\Users\Ryan Asafe\Documents\falta farmacia\src\components\ComparisonView.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Backticks: {content.count('`')}")
print(f"Double Quotes: {content.count('\"')}")
print(f"Single Quotes: {content.count('\'')}")
