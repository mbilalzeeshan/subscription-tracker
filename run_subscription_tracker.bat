@echo off
REM Launch the Subscription Tracker in Chrome app mode
REM Change the path below if you moved the folder
set "APP_PATH=%~dp0index.html"
REM Try to use Chrome first, then Edge, then default browser
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="%APP_PATH%"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="%APP_PATH%"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    "%LocalAppData%\Google\Chrome\Application\chrome.exe" --app="%APP_PATH%"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="%APP_PATH%"
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="%APP_PATH%"
) else if exist "%LocalAppData%\Microsoft\Edge\Application\msedge.exe" (
    "%LocalAppData%\Microsoft\Edge\Application\msedge.exe" --app="%APP_PATH%"
) else (
    start "" "%APP_PATH%"
)