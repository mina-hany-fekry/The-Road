import sys
from PIL import Image, ImageDraw

def run():
    for size, name in [(192, 'icon-192.png'), (512, 'icon-512.png'), (180, 'apple-touch-icon.png')]:
        img = Image.new('RGBA', (size, size), (15, 23, 42, 255))
        draw = ImageDraw.Draw(img)
        # Background border
        pad = int(size * 0.05)
        draw.rectangle([pad, pad, size - pad, size - pad], outline=(59, 130, 246, 255), width=max(2, int(size * 0.03)))
        
        # Center circle
        cx, cy = size // 2, size // 2
        r = int(size * 0.3)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(30, 41, 59, 255), outline=(99, 102, 241, 255), width=max(2, int(size * 0.02)))
        
        # Database top
        w = int(size * 0.36)
        h = int(size * 0.1)
        draw.ellipse([cx - w//2, cy - int(size*0.18), cx + w//2, cy - int(size*0.18) + h], fill=(59, 130, 246, 255))
        draw.rectangle([cx - w//2, cy - int(size*0.18) + h//2, cx + w//2, cy], fill=(37, 99, 235, 255))
        draw.ellipse([cx - w//2, cy - h//2, cx + w//2, cy + h//2], fill=(29, 78, 216, 255))
        
        # Python accent
        draw.rectangle([cx - int(size*0.18), cy + int(size*0.08), cx + int(size*0.18), cy + int(size*0.18)], fill=(245, 158, 11, 255))
        
        path = f"C:/Users/mina.hany/.gemini/antigravity/scratch/study-tracker-pwa/icons/{name}"
        img.save(path)
        print(f"Saved {path}")
    
    # Save favicon
    img.save("C:/Users/mina.hany/.gemini/antigravity/scratch/study-tracker-pwa/favicon.png")
    print("All icons generated successfully!")

if __name__ == '__main__':
    run()
