@echo off
echo Subiendo cambios a GitHub...
git add .
git commit -m "Actualizacion de menu - %date% %time%"
git push
echo.
echo ¡Despliegue automatico iniciado en Netlify!
pause