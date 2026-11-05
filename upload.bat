@echo off
chcp 65001 > nul
cls
echo ========================================================
echo   تحديث ورفع التطبيق تلقائياً إلى GitHub
echo ========================================================
echo.
cd /d "%~dp0"
python sync_update.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo جاري المحاولة باستخدام Git المباشر...
    git add .
    git commit -m "Direct update"
    git push origin main
)
echo.
pause
