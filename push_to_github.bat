@echo off
chcp 65001 > nul
title رفع تطبيق DataMaster & Spiritual Life على GitHub

echo ========================================================
echo   رفع تطبيق DataMaster & Spiritual Life إلى GitHub
echo ========================================================
echo.
echo 1. تأكد من أنك قمت بإنشاء مستودع جديد (New Repository) على:
echo    https://github.com/new
echo    (بدون وضع علامة على Add README أو .gitignore)
echo.

set /p REPO_URL="أدخل رابط المستودع (مثال: https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo لم يتم إدخال رابط! تم إلغاء العملية.
    pause
    exit /b
)

echo.
echo جاري ربط المستودع ورفع الملفات...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   تم الرفع على GitHub بنجاح!
    echo ========================================================
    echo.
    echo لتشغيل التطبيق أونلاين مجاناً كـ PWA عبر GitHub Pages:
    echo 1. افتح صفحة المستودع على GitHub.
    echo 2. ادخل على Settings -> Pages.
    echo 3. في Build and deployment اختر: Deploy from a branch.
    echo 4. اختر Branch: main ومجلد: / (root) ثم اضغط Save.
    echo 5. في خلال دقيقة سيصبح التطبيق متاحاً على رابط مباشر!
    echo.
) else (
    echo.
    echo حدث خطأ أثناء الرفع! تأكد من صحة الرابط وأنك مسجل الدخول في Git.
)

pause
