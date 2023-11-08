@echo off
setlocal enabledelayedexpansion

REM Check if FBX2glTF executable exists, download if not
if not exist "FBX2glTF-windows-x64.exe" (
    echo Downloading FBX2glTF-windows-x64.exe...
    curl -o FBX2glTF-windows-x64.exe -LJO https://github.com/facebookincubator/FBX2glTF/releases/download/v0.9.7/FBX2glTF-windows-x64.exe
    if !errorlevel! neq 0 (
        echo Error downloading FBX2glTF-windows-x64.exe. Please check the link or try again later.
        pause
        exit /b
    )
    echo FBX2glTF-windows-x64.exe downloaded successfully.
)

REM Create output directory if not present
if not exist "output" (
    mkdir output
)

REM Initialize log file
echo. > conversion_log.txt

REM Loop through all FBX files in the current directory and convert to GLB
for %%f in (*.fbx) do (
    set "input=%%f"
    set "output=output\%%~nf.glb"
    FBX2glTF-windows-x64.exe -i !input! -o !output! -d --draco-compression-level 7 --draco-bits-for-position 14 --draco-bits-for-uv 14 --draco-bits-for-normals 9 --draco-bits-for-colors 6 --draco-bits-for-other 6
    if !errorlevel! neq 0 (
        echo Error converting !input! to GLB format. >> conversion_log.txt
    ) else (
        echo Converted !input! to !output! >> conversion_log.txt
    )
)

echo All FBX files converted to GLB and saved in the output directory.
pause
