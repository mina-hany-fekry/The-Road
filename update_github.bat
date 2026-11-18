@echo off
chcp 65001 > nul
title تحديث The Road على GitHub
echo ========================================================
echo   جاري رفع أحدث تعديلات The Road إلى GitHub...
echo ========================================================
echo.
cd /d "%~dp0"
git push origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   تم الرفع على GitHub بنجاح!
    echo   التحديث متاح الآن على الرابط:
    echo   https://mina-hany-fekry.github.io/The-Road/
    echo ========================================================
) else (
    echo.
    echo [تنبيه] تعذر الاتصال بـ GitHub.
    echo يرجى التأكد من الاتصال بشبكة إنترنت غير مقيدة (مثل باقة الموبايل Hotspot) ثم إعادة المحاولة.
)
echo.
pause
