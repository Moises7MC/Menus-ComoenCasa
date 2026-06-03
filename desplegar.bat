@echo off
cd /d "C:\Users\Moise\OneDrive\Documentos\Moche\COMO EN CASA\QR"
echo Subiendo cambios a GitHub...
git add .
git commit -m "Actualizacion de menu - %date% %time%"
git push
echo.
echo ¡Despliegue automatico iniciado en Netlify!
pause