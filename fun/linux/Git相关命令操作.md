# Git相关命令操作

## 常用命令
```zsh
# 设置用户名：
git config --global user.name "你的用户名"
# 设置邮箱地址：
git config --global user.email "你的邮箱地址"
# 查询配置信息
git config --global --list

# 设置系统代理
git config --global http.proxy 127.0.0.1:7897
git config --global https.proxy 127.0.0.1:7897

# 取消系统代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```
---

## 0.初始化项目

在 Linux、macOS 或 Windows 系统中，若要初始化一个 Git 项目，你可以按照下面的步骤操作：

### 1. 检查 Git 是否安装
在使用 Git 之前，要确保它已经安装在你的系统中。你可以通过在终端输入以下命令来检查：
```bash
git --version
```
如果系统已经安装了 Git，会显示 Git 的版本号；若未安装，你需要根据系统类型来安装，比如在 Ubuntu 上可以使用 `sudo apt install git` 命令。

### 2. 创建项目目录
如果你还没有项目目录，可以在终端使用 `mkdir` 命令来创建，例如创建一个名为 `my_project` 的目录：
```bash
mkdir my_project
```
接着使用 `cd` 命令进入该目录：
```bash
cd my_project
```

### 3. 初始化 Git 仓库
在项目目录下，输入下面的命令来初始化一个新的 Git 仓库：
```bash
git init
```
执行该命令后，Git 会在当前目录下创建一个名为 `.git` 的隐藏目录，这就代表 Git 仓库已经成功初始化。

### 4. 配置用户信息
在提交代码之前，你需要配置你的用户名和邮箱，这些信息会记录在每次提交的日志中。配置命令如下：
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```
如果你想为当前项目单独配置用户名和邮箱，可以去掉 `--global` 参数，在项目目录下执行：
```bash
git config user.name "Your Name"
git config user.email "your_email@example.com"
```

### 5. 添加文件并提交
将文件添加到 Git 仓库，首先要把文件添加到暂存区，然后提交到本地仓库。以下是示例命令：
- 创建一个示例文件：
```bash
touch README.md
```
- 将文件添加到暂存区：
```bash
git add README.md
```
如果你想将当前目录下的所有文件添加到暂存区，可以使用：
```bash
git add .
```
- 提交暂存区的文件到本地仓库：
```bash
git commit -m "Initial commit"
```
其中 `-m` 参数用于添加提交的描述信息。

经过以上步骤，你就完成了一个 Git 项目的初始化。之后你可以将本地仓库与远程仓库关联，把代码推送到远程仓库。 

---

## 1.提交流程
```zsh
#1.把更改的代码暂存起来
# 此命令会把所有更改的文件全部暂存起来。
git add . 
# 如果要单个来，只需要 . 替换成对应的文件名即可。
git add temp.txt

#2.把暂存的改动提交到本地的版本库
# -m 参数表示可以直接输入后面的 message，简要说明这次改动。
git commit -m "xxx"

#3.将本地的分支版本上传到远程并合并
# git push 的命令格式一般是
git push <远程主机名> <本地分支名>：<远程分支名>
# eg：git push origin master:master
# 当然，一般情况下，我们都不用写后面的，直接 git push 即可。


```


## 2.更新 .gitignore
```zsh
git rm -r --cached .    # 从已跟踪文件清单中移除所有文件
    
git add .    # 重新添加所有文件（在这一步中 .gitignore 的配置将会生效）
git commit -m "chore: update .gitignore"    # 提交更改
git push    # 推送提交

```



