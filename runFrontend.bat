@echo off

setlocal

call :processargs %*
call :checkInstalled yarn

yarn run start

:processargs
set arg=%1
if defined arg (
    if "%arg%"=="-h" (
        call :show_help
        exit 0
    ) else if "%arg%"=="-n" (
        rmdir /s /q node_modules
        call yarn install
        exit 0
    ) else if "%arg%"=="-c" (
        call yarn add sharp-cli@^2.1.0 --global
    ) else if "%arg%"=="-s" (
        set "NODE_OPTIONS=--openssl-legacy-provider"
    ) else (
        echo Invalid option
        echo Try './runFrontend -h' for more information
        exit 1
    )
    shift
    goto processargs
)
goto :eof

:checkInstalled
where.exe %1 >nul 2>nul
if %errorlevel% equ 0 (
    echo %1 is installed
) else (
    echo Error: %1 is not installed. >&2
    exit 1
)
goto :eof

:show_help
echo Usage: ./runFrontend [OPTIONS]
echo Script for running the frontend
echo.
echo Options:
echo -h     Display this help message and exit
echo -n     Reinstall node_modules
echo -c     Install sharp-cli 
echo -s     Add ssl
echo.
goto :eof

endlocal