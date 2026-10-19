$base = 'https://hafsa-weds-anas.vercel.app'
$files = @(
  'assests/images/first.png',
  'assests/images/cover1.png',
  'assests/images/topf.png',
  'assests/images/light.png',
  'assests/images/bg.png',
  'assests/images/fl.png',
  'assests/images/SAVE.png',
  'assests/images/insha.png',
  'assests/images/bl-fl.png',
  'assests/fonts/Marquis.ttf',
  'assests/fonts/avakine-regular.otf',
  'assests/audio/music1.mp3',
  'assests/videos/nadavd.mp4'
)

$destDir = 'C:\Users\Admin\.gemini\antigravity\scratch\wedding-invitation'

foreach ($item in $files) {
    $url = "$base/$item"
    $out = Join-Path $destDir $item
    $parent = Split-Path -Path $out -Parent
    if (-not (Test-Path $parent)) { 
        New-Item -ItemType Directory -Force -Path $parent | Out-Null 
    }
    try {
        Write-Host "Downloading $url ..."
        Invoke-WebRequest -Uri $url -OutFile $out -TimeoutSec 60
        Write-Host "Success: $item"
    } catch {
        Write-Host "Error $item : $_"
    }
}
