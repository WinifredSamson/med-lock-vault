# Git 使用说明 / Git Usage Guide

## 自动推送脚本 / Auto Push Scripts

为了方便每次改动后自动上传到GitHub，我们提供了两个脚本：

### Windows PowerShell 脚本

```powershell
.\git-push.ps1
```

### Linux/Mac Bash 脚本

```bash
chmod +x git-push.sh
./git-push.sh
```

## 手动推送 / Manual Push

如果你想手动控制提交信息，可以使用以下命令：

```bash
# 1. 查看更改状态
git status

# 2. 添加所有更改
git add .

# 3. 提交更改（替换为你的提交信息）
git commit -m "Your commit message here"

# 4. 推送到GitHub
git push origin main
```

## 配置信息 / Configuration

当前Git配置：
- **用户名**: WinifredSamson
- **邮箱**: fcste295558@outlook.com
- **远程仓库**: https://github.com/WinifredSamson/med-lock-vault.git

## 注意事项 / Notes

1. **敏感信息**: 确保 `.env.local` 和其他敏感文件已在 `.gitignore` 中
2. **提交前检查**: 使用 `git status` 查看将要提交的文件
3. **提交信息**: 建议使用有意义的提交信息，描述本次更改的内容

## 常用命令 / Common Commands

```bash
# 查看更改
git status

# 查看提交历史
git log --oneline

# 拉取远程更改
git pull origin main

# 查看远程仓库
git remote -v
```

