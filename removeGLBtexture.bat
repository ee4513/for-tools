@echo off
setlocal enabledelayedexpansion

REM Check if removeTexCmd.js file exists, download if not
if not exist "removeTexCmd.js" (
    echo Downloading removeTexCmd.js...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://github.com/ee4513/for-tools/raw/main/removeTexCmd.js', 'removeTexCmd.js')"

    REM Check if the file was downloaded successfully
    if exist "removeTexCmd.js" (
        echo removeTexCmd.js downloaded successfully.
    ) else (
        echo Error downloading removeTexCmd.js. Please check the link or try again later.
        pause
        exit /b
    )
) else (
    echo removeTexCmd.js already exists in the current directory.
)


REM Create output directory if not present
if not exist "no-texture" (
    mkdir no-texture
)

REM Initialize log file
echo. > texture_log.txt

REM Loop through all FBX files in the current directory and convert to GLB
for %%f in (*.glb) do (
    set "input=%%f"
    set "output=no-texture\%%~nf.glb"
    node removeTexCmd.js !input! !output!
    if !errorlevel! neq 0 (
        echo Error removing !input! from GLB format.
    ) else (
        echo Removed-texture-From !input! to !output!
    )
)

echo All texture are removed from GLB.
pause
