@echo off
cd /d "C:\publish\QR"
git add .
git commit -m "Actualizacion de menu - %date% %time%" 2>&1
git push origin main 2>&1
echo.
echo Listo!
pause