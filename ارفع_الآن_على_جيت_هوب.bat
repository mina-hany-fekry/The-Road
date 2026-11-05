@echo off
chcp 65001 > nul
cd /d "D:\Mina\Personal\study-tracker-pwa"
title رفع التطبيق إلى مستودع The-Road على GitHub
echo ========================================================
echo   جاري الرفع إلى المستودع:
echo   https://github.com/mina-hany-fekry/The-Road.git
echo ========================================================
echo.
echo إذا ظهرت لك نافذة تطلب تسجيل الدخول:
echo اضغط على [Sign in with your browser]
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   تم الرفع بنجاح!
    echo ========================================================
    echo.
    echo لتشغيل التطبيق أونلاين:
    echo 1. ادخل على صفحة المستودع: https://github.com/mina-hany-fekry/The-Road
    echo 2. ادخل على Settings -^> Pages
    echo 3. اختر Branch: main ثم اضغط Save
)
pause
