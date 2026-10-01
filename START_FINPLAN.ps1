$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

function Fail($message) {
    Write-Host $message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================"
Write-Host "             FINPLAN WINDOWS"
Write-Host "========================================"
Write-Host ""

if (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonLauncher = "py"
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonLauncher = "python"
} else {
    Fail "Python 3 was not found. Install Python 3 and run this file again."
}

if (-not (Test-Path "$root\.venv\Scripts\python.exe")) {
    Write-Host "[1/6] Creating Python environment..."
    & $pythonLauncher -m venv "$root\.venv"
    if ($LASTEXITCODE -ne 0) { Fail "Could not create the Python environment." }
} else {
    Write-Host "[1/6] Python environment ready."
}

$python = "$root\.venv\Scripts\python.exe"

Write-Host "[2/6] Installing dependencies..."
& $python -m pip install --disable-pip-version-check -q -r "$root\requirements.txt"
if ($LASTEXITCODE -ne 0) { Fail "Could not install Python dependencies." }

$envPath = "$root\.env"
if (-not (Test-Path $envPath)) {
    if (Test-Path "$root\.env.example") { Copy-Item "$root\.env.example" $envPath }
    Fail "Missing .env. Add BOT_TOKEN to .env."
}
$envText = Get-Content $envPath -Raw
if ($envText -notmatch '(?m)^BOT_TOKEN=\s*\S+') {
    Fail "BOT_TOKEN is missing in .env."
}

Write-Host "[3/6] Starting API..."
$apiOut = "$root\api.out.log"
$apiErr = "$root\api.err.log"
Remove-Item $apiOut,$apiErr -Force -ErrorAction SilentlyContinue
$api = Start-Process -FilePath $python -ArgumentList "-m uvicorn app.main:app --host 127.0.0.1 --port 8000" -WorkingDirectory $root -RedirectStandardOutput $apiOut -RedirectStandardError $apiErr -PassThru -WindowStyle Minimized

$apiReady = $false
for ($i=0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    try {
        $health = Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" -UseBasicParsing -TimeoutSec 2
        if ($health.StatusCode -eq 200) { $apiReady = $true; break }
    } catch {}
    if ($api.HasExited) { break }
}
if (-not $apiReady) {
    Write-Host "API failed to start." -ForegroundColor Red
    if (Test-Path $apiErr) { Get-Content $apiErr -Tail 40 }
    if (Test-Path $apiOut) { Get-Content $apiOut -Tail 40 }
    Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
    exit 1
}
Write-Host "API is ready." -ForegroundColor Green

Write-Host "[4/6] Starting ngrok HTTPS tunnel..."
$tools = "$root\tools"
New-Item -ItemType Directory -Force $tools | Out-Null
$ngrok = "$tools\ngrok.exe"
$configDir = "$root\.ngrok"
$configFile = "$configDir\ngrok.yml"
New-Item -ItemType Directory -Force $configDir | Out-Null

if (-not (Test-Path $ngrok)) {
    Write-Host "Downloading ngrok..."
    $ngrokZip = "$tools\ngrok.zip"
    try {
        Invoke-WebRequest -Uri "https://bin.ngrok.com/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip" -OutFile $ngrokZip -UseBasicParsing
        Expand-Archive -Path $ngrokZip -DestinationPath $tools -Force
        Remove-Item $ngrokZip -Force -ErrorAction SilentlyContinue
    } catch {
        Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
        Fail "Could not download ngrok from the official ngrok CDN. Check your internet connection and try again."
    }
}

if (-not (Test-Path $ngrok)) {
    Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
    Fail "ngrok.exe was not found after download."
}

# ngrok requires an account authtoken for the normal HTTP agent flow.
# Accept both the raw token and the full command copied from the dashboard,
# because users sometimes paste: ngrok config add-authtoken <TOKEN>.
function Normalize-NgrokToken($value) {
    if ($null -eq $value) { return $null }
    $t = $value.Trim()
    $t = $t.Trim('"').Trim("'")
    if ($t -match '(?i)^ngrok\s+config\s+add-authtoken\s+(.+)$') {
        $t = $Matches[1].Trim()
    }
    $t = $t.Trim('"').Trim("'")
    return $t
}

function Save-NgrokToken($tokenValue) {
    $normalized = Normalize-NgrokToken $tokenValue
    if ([string]::IsNullOrWhiteSpace($normalized)) { return $false }
    # ngrok v3 tokens are long opaque strings. Reject obvious command text.
    if ($normalized -match '(?i)\bngrok\s+config\s+add-authtoken\b') { return $false }
    & $ngrok config add-authtoken $normalized --config $configFile | Out-Null
    return ($LASTEXITCODE -eq 0)
}

$needsToken = $true
if (Test-Path $configFile) {
    $cfg = Get-Content $configFile -Raw -ErrorAction SilentlyContinue
    if ($cfg -match '(?m)^\s*authtoken:\s*(.+?)\s*$') {
        $existing = Normalize-NgrokToken $Matches[1]
        if (-not [string]::IsNullOrWhiteSpace($existing) -and $existing -notmatch '(?i)\bngrok\s+config\s+add-authtoken\b') {
            # Re-save through ngrok so a stale or malformed config cannot be reused.
            if (Save-NgrokToken $existing) {
                $needsToken = $false
            }
        }
    }
}

if ($needsToken) {
    Write-Host ""
    Write-Host "FIRST RUN: ngrok needs an authtoken." -ForegroundColor Yellow
    Write-Host "Paste either the raw token OR the full 'ngrok config add-authtoken ...' command." -ForegroundColor Yellow
    Write-Host "It will be saved only in this PC's local .ngrok folder." -ForegroundColor Yellow
    Write-Host "Official setup: https://ngrok.com/download/windows" -ForegroundColor Cyan
    Write-Host ""
    $tokenInput = Read-Host "ngrok authtoken"
    if (-not (Save-NgrokToken $tokenInput)) {
        Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
        Fail "ngrok rejected the authtoken. Paste only the token or the full ngrok config add-authtoken command."
    }
}

$ngrokOut = "$root\ngrok.out.log"
$ngrokErr = "$root\ngrok.err.log"
Remove-Item $ngrokOut,$ngrokErr -Force -ErrorAction SilentlyContinue

# Start ngrok. Its local API on 127.0.0.1:4040 is used to obtain the actual public URL;
# this avoids fragile parsing of console output.
$ngrokProc = Start-Process -FilePath $ngrok -ArgumentList "http 8000 --config `"$configFile`" --log stdout" -WorkingDirectory $root -RedirectStandardOutput $ngrokOut -RedirectStandardError $ngrokErr -PassThru -WindowStyle Minimized

$publicUrl = $null
for ($i=0; $i -lt 45; $i++) {
    Start-Sleep -Seconds 1
    try {
        $tunnels = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 2
        foreach ($t in $tunnels.tunnels) {
            if ($t.public_url -and $t.public_url -match '^https://') {
                $publicUrl = $t.public_url.TrimEnd('/')
                break
            }
        }
    } catch {}
    if ($publicUrl) { break }
    if ($ngrokProc.HasExited) { break }
}

if (-not $publicUrl) {
    Write-Host "ngrok did not create an HTTPS endpoint." -ForegroundColor Red
    Write-Host ""
    if (Test-Path $ngrokErr) { Get-Content $ngrokErr -Tail 80 }
    if (Test-Path $ngrokOut) { Get-Content $ngrokOut -Tail 80 }
    Stop-Process -Id $ngrokProc.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "HTTPS URL: $publicUrl" -ForegroundColor Green

$publicReady = $false
for ($i=0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    try {
        $health = Invoke-WebRequest -Uri "$publicUrl/health" -UseBasicParsing -TimeoutSec 4
        if ($health.StatusCode -eq 200 -and $health.Content -match '"status"\s*:\s*"ok"') { $publicReady = $true; break }
    } catch {}
}
if ($publicReady) {
    Write-Host "Public API health check passed." -ForegroundColor Green
} else {
    Write-Host "Public health check did not pass yet. Continuing; ngrok is running." -ForegroundColor Yellow
}

$envText = Get-Content $envPath -Raw
if ($envText -match '(?m)^PUBLIC_APP_URL=.*$') {
    $envText = [regex]::Replace($envText, '(?m)^PUBLIC_APP_URL=.*$', "PUBLIC_APP_URL=$publicUrl")
} else {
    $envText += "`r`nPUBLIC_APP_URL=$publicUrl`r`n"
}
[System.IO.File]::WriteAllText($envPath, $envText, [System.Text.UTF8Encoding]::new($false))

Write-Host "[5/6] Starting Telegram bot..."
$botOut = "$root\bot.out.log"
$botErr = "$root\bot.err.log"
Remove-Item $botOut,$botErr -Force -ErrorAction SilentlyContinue
$bot = Start-Process -FilePath $python -ArgumentList "-m app.bot" -WorkingDirectory $root -RedirectStandardOutput $botOut -RedirectStandardError $botErr -PassThru -WindowStyle Minimized
Start-Sleep -Seconds 4

if ($bot.HasExited) {
    Write-Host "Bot exited immediately." -ForegroundColor Red
    if (Test-Path $botErr) { Get-Content $botErr -Tail 80 }
    if (Test-Path $botOut) { Get-Content $botOut -Tail 80 }
    Stop-Process -Id $ngrokProc.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "[6/6] FINPLAN is running." -ForegroundColor Green
Write-Host ""
Write-Host "Mini App: $publicUrl"
Write-Host "Open Telegram and send /start to your bot."
Write-Host "The finplan menu button is configured automatically."
Write-Host ""
Write-Host "Keep this window open. Close it to stop FINPLAN."
Write-Host ""

try {
    while (-not $bot.HasExited) {
        Start-Sleep -Seconds 2
    }
} finally {
    Stop-Process -Id $ngrokProc.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $api.Id -Force -ErrorAction SilentlyContinue
}
