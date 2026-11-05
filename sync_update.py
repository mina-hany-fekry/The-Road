import os
import re
import datetime
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))
sw_path = os.path.join(DIR, 'sw.js')

# Generate fresh build timestamp
now_str = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
friendly_date = datetime.datetime.now().strftime('%Y-%m-%d %I:%M %p')

# 1. Update sw.js with new build timestamp
if os.path.exists(sw_path):
    with open(sw_path, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(r"const BUILD_TIME = '[^']*';", f"const BUILD_TIME = '{now_str}';", content)
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"[OK] Cache updated with build: {now_str}")

# 2. Git add, commit, and push
git_exe = r'C:\Users\mina.hany\AppData\Local\Programs\Git\cmd\git.exe'
if not os.path.exists(git_exe):
    git_exe = 'git'

print("\n[...] Staging changes and committing...")
subprocess.run([git_exe, 'add', '.'], cwd=DIR)

commit_msg = f"Auto update ({friendly_date})"
subprocess.run([git_exe, 'commit', '-m', commit_msg], cwd=DIR)

print("\n[...] Pushing to GitHub (The-Road)...")
res = subprocess.run([git_exe, 'push', 'origin', 'main'], cwd=DIR)

if res.returncode == 0:
    print("\n" + "="*56)
    print("  تم رفع أي تعديل بنجاح إلى GitHub!")
    print(f"  الوقت: {friendly_date}")
    print("  التعديل هيسمع على الموبايل والويب تلقائياً خلال دقيقة!")
    print("="*56 + "\n")
else:
    print("\n[!] حدث خطأ أثناء الرفع إلى GitHub. تأكد من اتصال الإنترنت.")
