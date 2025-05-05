---
title: "Windows Command"
date: 2025-05
quote: tryhackme
categories:
  - 技术
  - 教程
tags: [Markdown, windwos]
description: Windows Command Line
draft: false
---

# Windows Command

## Windows Command Line

<span style="font-size: 23px;">**Introduction**</span>

- **GUI:** The graphical user interface (GUI), is a form of user interface that allows users to interact with electronic devices through graphical icons and audio indicators such as primary notation, instead of text-based UIs, typed command labels or text navigation. GUIs were introduced in reaction to the perceived steep learning curve of command-line interfaces (CLIs),which require commands to be typed on a computer keyboard.

- **CLI:** Command Line Interface

**Objectives:** 

To grasp how to use MS Windows Command Prompt **cmd.exe**, the default command-line interpreter in the Windows environment, the default command-line interpreter in the Windows environment. We will learn how to use the command line to:

- Display basic system information
- Check and troubleshoot network configuration
- Manage files and folders
- Check running processes

### Basic System Information

Before issuing commands, we should note that we can only issue the commands within the Windows Path. You can issue the command **set** to check your path from the command line. The terminal output below shows the path where MS Windows will execute commands, as indicated by the line starting with **Path=**.

```bash
# determine the operating system (OS) version
ver

# 系统信息
systeminfo
```
<span style="font-size: 23px;">**tricks**</span>

First, you can pipe it through **more** if the output is too long. Then, you can view it page after page by pressing the space bar button. To demonstrate this, try running **driverquery** and compare it with running **driverquery | more**. In the latter, you can display the output page by page and you can exit it using **CTRL + C**.

- **help** - Provides help information for a specific command
- **cls** - Clears the Command Prompt screen.

### Network Troubleshooting

```bash
#  check network information
ipconfig
ipconfig /all
ipconfig /flushdns

# ping
ping target_name

# 跟踪到达目标所经过的网络路由
tracert target_name

# 查找主机或域并返回其 IP 地址
nslookup example.com

# 显示当前网络连接和监听端口
netstat
netstat -aon|findstr "8081"
```

### File and Disk Management

<span style="font-size: 23px;">**Working With Directories**</span>

```bash
# 显示当前驱动器和目录
cd

# 切换到任何目录
cd target_directory

# 查看子目录
dir

# visually represent the child directories and subdirectories
tree

# 创建目录
 mkdir directory_name
# 移除目录
rmdir directory_name
```

<span style="font-size: 23px;">**Working With Files**</span>

```bash
# 显示文件内容
type filename
type | more filename 

# 复制文件
copy test.txt test2.txt

# 移动文件
move test2.txt ..

# 删除文件
del test1.txt
erase test2.txt

```

We can use the wildcard character * to refer to multiple files.

### Task and Process Management

We can list the running processes using **tasklist**.

Some filtering is helpful because the output is expected to be very long. You can check all available filters by displaying the help page using **tasklist /?**. Let’s say that we want to search for tasks related to sshd.exe, we can do that with the command **tasklist /FI "imagename eq sshd.exe"**. Note that **/FI** is used to set the filter image name equals sshd.exe.

tasklist /FI "imagename eq notepad.exe"

With the process ID (PID) known, we can terminate any task using **taskkill /PID target_pid**. For example, if we want to kill the process with PID **4567**, we would issue the command **taskkill /PID 4567**.

### end

We intentionally omitted a few common commands as we didn’t see a real value for including them in a beginner room. We mention them below so that you know that the command line can be used for other tasks.

- **chkdsk**: checks the file system and disk volumes for errors and bad sectors.
- **driverquery**: displays a list of installed device drivers.
- **sfc /scannow**: scans system files for corruption and repairs them if possible.
It is important to remember all the commands covered in the previous tasks; moreover, it is equally important to know that **/?** can be used with most commands to display a help page.

In this section, we used the command **more** in two ways:

- Display text files: **more file.txt**
- Pipe long output to view it page by page: **some_command | more**
Equipped with this knowledge, we now know how to display the help page of a new command and how to display long output one page at a time.