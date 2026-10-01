@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0START_FINPLAN.ps1"
if errorlevel 1 (
  echo.
  echo FINPLAN failed to start.
  pause
)
