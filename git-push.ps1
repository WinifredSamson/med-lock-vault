# Git Push Script for Med Lock Vault
# This script automatically adds, commits, and pushes all changes to GitHub

Write-Host "=== Med Lock Vault - Git Push Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "Error: Not a git repository!" -ForegroundColor Red
    exit 1
}

# Check for changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

# Show status
Write-Host "Current changes:" -ForegroundColor Green
git status --short
Write-Host ""

# Ask for commit message
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Update: $timestamp"
}

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Commit failed!" -ForegroundColor Red
    exit 1
}

# Push
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Error: Push failed!" -ForegroundColor Red
    exit 1
}

