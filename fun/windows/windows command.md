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


## Windows PowerShell

**PowerShell** is a task automation and configuration management program from Microsoft, consisting of a command-line shell and the associated scripting language.

From the official Microsoft [page](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.4): “PowerShell is a cross-platform task automation solution made up of a command-line shell, a scripting language, and a configuration management framework.”

PowerShell is a powerful tool from Microsoft designed for task automation and configuration management. It combines a command-line interface and a scripting language built on the .NET framework. Unlike older text-based command-line tools, **PowerShell is object-oriented**, which means it can handle complex data types and interact with system components more effectively. Initially exclusive to Windows, PowerShell has lately expanded to support macOS and Linux, making it a versatile option for IT professionals across different operating systems.

<span style="font-size: 23px;">**The Power in PowerShell**</span>

To fully grasp the power of PowerShell, we first need to understand what an **object** is in this context.

In programming, an **object** represents an item with **properties** (characteristics) and **methods** (actions). For example, a **car** object might have properties like **Color**, **Model**, and **FuelLevel**, and methods like **Drive()**, **HonkHorn()**, and **Refuel()**.

Similarly, in PowerShell, objects are fundamental units that encapsulate data and functionality, making it easier to manage and manipulate information. An object in PowerShell can contain file names, usernames or sizes as data (**properties**), and carry functions (**methods**) such as copying a file or stopping a process.

The traditional Command Shell’s basic commands are text-based, meaning they process and output data as plain text. Instead, when a **cmdlet** (pronounced command-let) is run in PowerShell, it returns objects that retain their properties and methods. This allows for more powerful and flexible data manipulation since these objects do not require additional parsing of text.

### Basics

<span style="font-size: 23px;">**Basic Syntax: Verb-Noun**</span>

As previously mentioned, PowerShell commands are known as **cmdlets** (pronounced **command-lets**). They are much more powerful than the traditional Windows commands and allow for more advanced data manipulation.

Cmdlets follow a consistent **Verb-Noun** naming convention. This structure makes it easy to understand what each cmdlet does. The **Verb** describes the action, and the **Noun** specifies the object on which action is performed. For example:

- **Get-Content**: Retrieves (gets) the content of a file and displays it in the console.
- **Set-Location**: Changes (sets) the current working directory.

<span style="font-size: 23px;">**Basic Cmdlets**</span>

To list all available cmdlets, functions, aliases, and scripts that can be executed in the current PowerShell session, we can use **Get-Command**. It’s an essential tool for discovering what commands one can use.

For each **CommandInfo** object retrieved by the cmdlet, some essential information (properties) is displayed on the console. It’s possible to filter the list of commands based on displayed property values. For example, if we want to display only the available commands of type “function”, we can use **-CommandType "Function"**.

We will learn more efficient ways to filter output from cmdlets in the upcoming tasks.

Another essential cmdlet to keep in our tool belt is **Get-Help**: it provides detailed information about cmdlets, including usage, parameters, and examples. It’s the go-to cmdlet for learning how to use PowerShell commands.

**Get-Help** informs us that we can retrieve other useful information about a cmdlet by appending some options to the basic syntax. For example, by appending **-examples** to the command displayed above, we will be shown a list of common ways in which the chosen cmdlet can be used.

To make the transition easier for IT professionals, PowerShell includes aliases —which are shortcuts or alternative names for cmdlets— for many traditional Windows commands. Indispensable for users already familiar with other command-line tools, **Get-Alias** lists all aliases available. For example, **dir** is an alias for **Get-ChildItem**, and **cd** is an alias for **Set-Location

<span style="font-size: 23px;">**Where to Find and Download Cmdlets**</span>

Another powerful feature of PowerShell is the possibility of extending its functionality by downloading additional cmdlets from online repositories.  

**NOTE:** Please note that the cmdlets listed in this section require a working internet connection to query online repositories. The attached machine doesn't have access to the internet, therefore these commands won't work in this environment.

To search for modules (collections of cmdlets) in online repositories like the PowerShell Gallery, we can use **Find-Module**. Sometimes, if we don’t know the exact name of the module, it can be useful to search for modules with a similar name. We can achieve this by filtering the **Name** property and appending a wildcard (*) to the module’s partial name, using the following standard PowerShell syntax: **Cmdlet -Property "pattern\*"**.

Once identified, the modules can be downloaded and installed from the repository with **Install-Module**, making new cmdlets contained in the module available for use.

```bash
# 查找 Cmdlet
Find-Module -Name "PowerShell*"

# 下载 Cmdlet
Install-Module -Name "PowerShellGet"

```

### Navigating the File System and Working with Files

PowerShell provides a range of cmdlets for navigating the file system and managing files, many of which have counterparts in the traditional Windows CLI.

```bash
# 会列出使用 -Path 参数指定位置的文件和目录 dir -> Get-ChildItem
dir 
dir filename

# 导航到其他目录 cd -> Set-Location
Set-Location -Path ".\Documents"

# 创建项目 New-Item 指定项目的路径及其类型（无论是文件还是目录）
New-Item -Path ".\captain-cabin\captain-wardrobe" -ItemType "Directory"

New-Item -Path ".\captain-cabin\captain-wardrobe\captain-boots.txt" -ItemType "File"

# 删除目录和文件 Remove-Item
Remove-Item -Path ".\captain-cabin\captain-wardrobe\captain-boots.txt"

Remove-Item -Path ".\captain-cabin\captain-wardrobe" 

# 复制文件和目录 Copy-Item
Copy-Item -Path .\captain-cabin\captain-hat.txt -Destination .\captain-cabin\captain-hat2.txt

# 移动文件和目录 Move-Item 
Move-Item -Path .\captain-cabin\captain-hat.txt -Destination .\captain-cabin\captain-hat2.txt

# 读取和显示文件的内容 Get-Content 类 Unix 系统中的 cat
Get-Content -Path ".\captain-hat.txt"
```

### Piping, Filtering, and Sorting Data

**Piping** is a technique used in command-line environments that allows the output of one command to be used as the input for another. This creates a sequence of operations where the data flows from one command to the next. Represented by the **|** symbol, piping is widely used in the Windows CLI, as introduced earlier in this module, as well as in Unix-based shells.

In PowerShell, piping is even more powerful because it passes **objects** rather than just text. These objects carry not only the data but also the properties and methods that describe and interact with the data.

<span style="font-size: 23px;">**Sort-Object**</span>

if you want to get a list of files in a directory and then sort them by size, you could use the following command in PowerShell:
```bash
Get-ChildItem | Sort-Object Length


    Directory: C:\Users\captain\Documents\captain-cabin

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          9/4/2024  12:50 PM              0 captain-boots.txt
-a----          9/4/2024  12:14 PM            264 captain-hat2.txt
-a----          9/4/2024  12:14 PM            264 captain-hat.txt
-a----          9/4/2024  12:37 PM           2116 ship-flag.txt
d-----          9/4/2024  12:50 PM                captain-wardrobe
```
Here, **Get-ChildItem** retrieves the files (as objects), and the pipe (**|**) sends those file objects to **Sort-Object**, which then sorts them by their **Length** (size) property. This object-based approach allows for more detailed and flexible command sequences.

<span style="font-size: 23px;">**Where-Object**</span>

To filter objects based on specified conditions, returning only those that meet the criteria, we can use the **Where-Object** cmdlet. For instance, to list only **.txt** files in a directory, we can use:

```bash
Get-ChildItem | Where-Object -Property "Extension" -eq ".txt" 


    Directory: C:\Users\captain\Documents\captain-cabin

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          9/4/2024  12:50 PM              0 captain-boots.txt
-a----          9/4/2024  12:14 PM            264 captain-hat.txt
-a----          9/4/2024  12:14 PM            264 captain-hat2.txt
-a----          9/4/2024  12:37 PM           2116 ship-flag.txt
```

Here, **Where-Object** filters the files by their **Extension** property, ensuring that only files with extension equal (**-eq**) to **.txt** are listed.

The operator **-eq** (i.e. "equal to") is part of a set of comparison operators that are shared with other scripting languages (e.g. Bash, Python). To show the potentiality of the PowerShell's filtering, we have selected some of the most useful operators from that list:

- **-ne**: "**not equal**". This operator can be used to exclude objects from the results based on specified criteria.
- **-gt**: "**greater than**". This operator will filter only objects which exceed a specified value. It is important to note that this is a strict comparison, meaning that objects that are equal to the specified value will be excluded from the results.
- **-ge**: "**greater than or equal to**". This is the non-strict version of the previous operator. A combination of -gt and -eq.
- **-lt**: "**less than**". Like its counterpart, "greater than", this is a strict operator. It will include only objects which are strictly below a certain value.
- **-le**: "**less than or equal to**". Just like its counterpart -ge, this is the non-strict version of the previous operator. A combination of -lt and -eq.

**-like** ：objects can also be filtered by selecting properties that match (-like) a specified pattern

```bash
Get-ChildItem | Where-Object -Property "Name" -like "ship*" 

    Directory: C:\Users\captain\Documents\captain-cabin

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          9/4/2024  12:37 PM           2116 ship-flag.txt
```

<span style="font-size: 23px;">**Select-Object**</span>

The next filtering cmdlet, **Select-Object**, is used to select specific properties from objects or limit the number of objects returned. It’s useful for refining the output to show only the details one needs.

```bash
Get-ChildItem | Select-Object Name,Length

Name              Length
----              ------
captain-wardrobe
captain-boots.txt 0
captain-hat.txt   264
captain-hat2.txt  264
ship-flag.txt     2116
```
The cmdlets pipeline can be extended by adding more commands, as the feature isn’t limited to just piping between two cmdlets.
build a pipeline of cmdlets to sort and filter the output with the goal of displaying the largest file in the
```bash
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 1

    Directory: C:\Users\captain\Documents\captain-cabin

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          9/4/2024  12:37 PM           2116 ship-flag.txt
```

<span style="font-size: 23px;">**Select-String**</span>

This cmdlet searches for text patterns within files, similar to **grep** in Unix-based systems or **findstr** in Windows Command Prompt. It’s commonly used for finding specific content within log files or documents.

```bash
Select-String -Path ".\captain-hat.txt" -Pattern "hat" 
```

The Select-String cmdlet fully supports the use of regular expressions (regex). This advanced feature allows for complex pattern matching within files, making it a powerful tool for searching and analysing text data.

### System and Network Information

PowerShell was created to address a growing need for a powerful automation and management tool to help system administrators and IT professionals. As such, it offers a range of cmdlets that allow the retrieval of detailed information about system configuration and network settings.

<span style="font-size: 23px;">**Get-ComputerInfo**</span>

The **Get-ComputerInfo** cmdlet retrieves comprehensive system information, including operating system information, hardware specifications, BIOS details, and more. It provides a snapshot of the entire system configuration in a single command. Its traditional counterpart **systeminfo** retrieves only a small set of the same details.

<span style="font-size: 23px;">**Get-LocalUser**</span>

Essential for managing user accounts and understanding the machine’s security configuration, **Get-LocalUser** lists all the local user accounts on the system. The default output displays, for each user, username, account status, and description.

<span style="font-size: 23px;">**Get-NetIPConfiguration**</span>

**Get-NetIPConfiguration** provides detailed information about the network interfaces on the system, including IP addresses, DNS servers, and gateway configurations.

<span style="font-size: 23px;">**Get-NetIPAddress**</span>

In case we need specific details about the IP addresses assigned to the network interfaces, the **Get-NetIPAddress** cmdlet will show details for all IP addresses configured on the system, including those that are not currently active.

### Real-Time System Analysis

To gather more advanced system information, especially concerning dynamic aspects like running processes, services, and active network connections, we can leverage a set of cmdlets that go beyond static machine details.

<span style="font-size: 23px;">**Get-Process**</span>

**Get-Process** provides a detailed view of all currently running processes, including CPU and memory usage, making it a powerful tool for monitoring and troubleshooting.

<span style="font-size: 23px;">**Get-Service**</span>

Similarly, **Get-Service** allows the retrieval of information about the status of services on the machine, such as which services are running, stopped, or paused. It is used extensively in troubleshooting by system administrators, but also by forensics analysts hunting for anomalous services installed on the system.

<span style="font-size: 23px;">**Get-NetTCPConnection**</span>

To monitor active network connections, **Get-NetTCPConnection** displays current TCP connections, giving insights into both local and remote endpoints. This cmdlet is particularly handy during an incident response or malware analysis task, as it can uncover hidden backdoors or established connections towards an attacker-controlled server.

<span style="font-size: 23px;">**Get-FileHash**</span>

Additionally, we are going to mention **Get-FileHash** as a useful cmdlet for generating file hashes, which is particularly valuable in incident response, threat hunting, and malware analysis, as it helps verify file integrity and detect potential tamper

### Scripting

**Scripting** is the process of writing and executing a series of commands contained in a text file, known as a script, to automate tasks that one would generally perform manually in a shell, like PowerShell.

Simply speaking, scripting is like giving a computer a to-do list, where each line in the script is a task that the computer will carry out automatically. This saves time, reduces the chance of errors, and allows to perform tasks that are too complex or tedious to do manually. As you learn more about shells and scripting, you’ll discover that scripts can be powerful tools for managing systems, processing data, and much more.

Learning scripting with PowerShell goes beyond the scope of this room. Nonetheless, we must understand that its power makes it a crucial skill across all cyber security roles.

- For **blue team** professionals such as incident responders, malware analysts, and threat hunters, PowerShell scripts can automate many different tasks, including log analysis, detecting anomalies, and extracting indicators of compromise (IOCs). These scripts can also be used to reverse-engineer malicious code (malware) or automate the scanning of systems for signs of intrusion.

- For the **red team**, including penetration testers and ethical hackers, PowerShell scripts can automate tasks like system enumeration, executing remote commands, and crafting obfuscated scripts to bypass defences. Its deep integration with all types of systems makes it a powerful tool for simulating attacks and testing systems’ resilience against real-world threats.

- Staying in the context of cyber security, **system administrators** benefit from PowerShell scripting for automating integrity checks, managing system configurations, and securing networks, especially in remote or large-scale environments. PowerShell scripts can be designed to enforce security policies, monitor systems health, and respond automatically to security incidents, thus enhancing the overall security posture.

Whether used defensively or offensively, PowerShell scripting is an essential capability in the cyber security toolkit.

<span style="font-size: 23px;">**Invoke-Command**</span>

**Invoke-Command** is essential for executing commands on remote systems, making it fundamental for system administrators, security engineers and penetration testers. **Invoke-Command** enables efficient remote management and—combining it with scripting—automation of tasks across multiple machines. It can also be used to execute payloads or commands on target systems during an engagement by penetration testers—or attackers alike.

Example 1: **Run a script on a server**

```bash
Invoke-Command -FilePath c:\scripts\test.ps1 -ComputerName Server01
```
    
The **FilePath** parameter specifies a script that is located on the local computer. The script runs on the remote computer and the results are returned to the local computer.

Example 2: **Run a command on a remote server**

```bash
Invoke-Command -ComputerName Server01 -Credential Domain01\User01 -ScriptBlock { Get-Culture }
```

The **ComputerName** parameter specifies the name of the remote computer. The **Credential** parameter is used to run the command in the security context of Domain01\User01, a user who has permission to run commands. The **ScriptBlock** parameter specifies the command to be run on the remote computer.

In response, PowerShell requests the password and an authentication method for the User01 account. It then runs the command on the Server01 computer and returns the result.
