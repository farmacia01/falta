
from PIL import Image
import os

source = r'c:\Users\Ryan Asafe\Documents\falta farmacia\necessarios\logoalice.png'
target_dir = r'c:\Users\Ryan Asafe\Documents\falta farmacia\public'

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

img = Image.open(source)

# Se a imagem for RGB (sem transparência), podemos tentar converter para RGBA se houver um fundo branco
# Mas por segurança, vamos apenas redimensionar.
# Se o usuário quiser transparência depois, podemos ajustar.

# favicon.ico (16, 32, 48)
img.save(os.path.join(target_dir, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])

# favicon-96x96.png
img.resize((96, 96), Image.Resampling.LANCZOS).save(os.path.join(target_dir, 'favicon-96x96.png'))

# apple-touch-icon.png (180x180)
img.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(target_dir, 'apple-touch-icon.png'))

# web-app-manifest-192x192.png
img.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(target_dir, 'web-app-manifest-192x192.png'))

# web-app-manifest-512x512.png
img.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(target_dir, 'web-app-manifest-512x512.png'))

print("All favicons generated successfully in " + target_dir)
