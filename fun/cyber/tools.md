---
title: "tools"
date: 2025-03
categories:
  - 技术
  - 教程
tags: [Markdown, web]
draft: true
---

# tools

---

## nmap

Nmap（Network Mapper）是一个开源的网络扫描工具，主要用于网络发现和安全审计。它可以快速扫描网络中的主机和服务，识别开放的端口、运行的服务以及操作系统信息。

### Nmap 的主要功能：
1. **端口扫描**：检测目标主机上开放的端口。
2. **服务识别**：识别运行在开放端口上的服务及其版本。
3. **操作系统检测**：推测目标主机的操作系统类型。
4. **网络拓扑发现**：发现网络中的活跃主机和路由信息。
5. **漏洞扫描**：通过脚本检测已知的漏洞。

### 常用命令示例：
```bash
# 扫描目标主机的所有开放端口
nmap 192.168.1.1

# 扫描指定端口范围
nmap -p 20-80 192.168.1.1

# 检测服务版本
nmap -sV 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 使用脚本进行漏洞扫描
nmap --script vuln 192.168.1.1
```

### 安装 Nmap：
在 Linux 系统上，可以通过以下命令安装：
```bash
sudo apt install nmap  # Ubuntu/Debian
sudo yum install nmap  # CentOS/RHEL
```

---

## Gobuster

Gobuster 是一个用 Go 语言编写的命令行工具，主要用于目录和文件的暴力破解以及 DNS 子域名的暴力破解。它非常适合用于渗透测试和安全评估，帮助发现隐藏的目录、文件和子域名。

Gobuster 的主要功能包括：
- 目录和文件暴力破解：通过字典文件尝试访问目标服务器上的隐藏目录和文件。
- DNS 子域名暴力破解：通过字典文件尝试发现目标域名的子域名。
- S3 存储桶暴力破解：尝试发现 AWS S3 存储桶。

Gobuster 的一些常用选项包括：
- `-u`：指定目标 URL。
- `-w`：指定字典文件路径。
- `-t`：指定并发线程数。
- `-o`：指定输出文件路径。

示例用法：
```sh
gobuster dir -u http://example.com -w /path/to/wordlist.txt -t 50 -o output.txt
```

这个命令会使用 `/path/to/wordlist.txt` 中的单词列表对 `http://example.com` 进行目录和文件暴力破解，并将结果保存到 `output.txt` 文件中。



