#!/bin/bash
# Git Push Script for Med Lock Vault
# This script automatically adds, commits, and pushes all changes to GitHub

echo "=== Med Lock Vault - Git Push Script ==="
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "Error: Not a git repository!"
    exit 1
fi

# Check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo "No changes to commit."
    exit 0
fi

# Show status
echo "Current changes:"
git status --short
echo ""

# Ask for commit message
read -p "Enter commit message (or press Enter for default): " commitMessage

if [ -z "$commitMessage" ]; then
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    commitMessage="Update: $timestamp"
fi

# Add all changes
echo "Adding all changes..."
git add .

# Commit
echo "Committing changes..."
git commit -m "$commitMessage"

if [ $? -ne 0 ]; then
    echo "Error: Commit failed!"
    exit 1
fi

# Push
echo "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "Successfully pushed to GitHub!"
else
    echo "Error: Push failed!"
    exit 1
fi

