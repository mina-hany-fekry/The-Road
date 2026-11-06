@echo off
chcp 65001 > nul
title The Road - Study and Soul PWA
cd /d "%~dp0"
echo =======================================================
echo    The Road - Study & Soul (علوم البيانات والروح)
echo =======================================================
echo.
echo Opening http://localhost:8080 in your browser...
start http://localhost:8080
echo.
echo Press Ctrl + C to stop the server when done.
echo -------------------------------------------------------
echo.
python -m http.server 8080
pause
