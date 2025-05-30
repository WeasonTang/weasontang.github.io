---
title: "Archlinux app"
date: 2025-05
categories:
  - 技术
  - 教程
tags: [Markdown, linux]
description: Archlinux 应用
sidebar: false
outline: 2
---

# Archlinux app

---

## nginx

### 安装

```bash
# 更新系统
sudo pacman -Syu
# 安装 Nginx
sudo pacman -S nginx
# 启动并设置 Nginx 开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

```
验证 Nginx 是否安装成功
可通过在浏览器中访问 http://localhost 来验证 Nginx 是否成功安装并运行。如果看到 “Welcome to nginx!” 的页面，说明 Nginx 已经成功安装并正在运行。

### 常用命令

```bash
# 状态
sudo systemctl status nginx

# 启动
sudo systemctl start nginx

# 停止
sudo systemctl stop nginx

# 重启
sudo systemctl restart nginx

```

### 修改

```bash
# 检查配置文件语法
sudo nginx -t

# 重新加载配置
# 如果只是修改了配置文件，想在不停止服务的情况下使新配置生效，可使用重新加载配置的命令：
sudo systemctl reload nginx

```
---

## IPv6 防火墙（ip6tables）

### 1.安装ip6tables
通常，ip6tables 已经包含在 iptables 包中，如果你还没有安装，可以使用以下命令进行安装：

```bash
sudo pacman -S iptables
```


### 2. 基础配置

#### 2.1 查看当前规则

```bash
sudo ip6tables -L -n -v
```
- -L 表示列出当前规则。
- -n 表示以数字形式显示 IP 地址和端口号。
- -v 表示显示详细信息。

#### 2.2 清空规则

```bash
# 清除现有规则
sudo ip6tables -F
sudo ip6tables -X
sudo ip6tables -Z
```
- -F 表示清空所有规则。
- -X 表示删除所有自定义链。
- -Z 表示将所有计数器归零。

#### 2.3 设置默认策略

```bash
# 设置默认策略（拒绝所有入站/允许所有出站）
sudo ip6tables -P INPUT DROP
sudo ip6tables -P FORWARD DROP
sudo ip6tables -P OUTPUT ACCEPT
```

- -P 用于设置默认策略。
- INPUT 链处理进入系统的数据包。
- FORWARD 链处理通过系统转发的数据包。
- OUTPUT 链处理从系统发出的数据包。

#### 2.4 添加规则

```bash
# 允许本地回环接口
sudo ip6tables -A INPUT -i lo -j ACCEPT

# 允许已建立的和相关的连接
sudo ip6tables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

```
### 3.关键 ICMPv6 放行（IPv6 必需）

```bash
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type destination-unreachable -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type packet-too-big -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type time-exceeded -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type parameter-problem -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type echo-request -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type echo-reply -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type router-advertisement -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type neighbor-solicitation -j ACCEPT
sudo ip6tables -A INPUT -p ipv6-icmp --icmpv6-type neighbor-advertisement -j ACCEPT
```

### 4.开放需要的端口

```bash
# 开放 TCP 22 端口（SSH）
sudo ip6tables -A INPUT -p tcp --dport 22 -j ACCEPT
# 开放 UDP 22 端口
sudo ip6tables -A INPUT -p udp --dport 22 -j ACCEPT

# 开放 TCP 80端口（HTTP）
sudo ip6tables -A INPUT -p tcp --dport 80 -j ACCEPT

# 开放 TCP 443 端口（HTTPS）
sudo ip6tables -A INPUT -p tcp --dport 443 -j ACCEPT

```
### 5.保存规则

**1.保存 IPv6 规则：**

```bash
sudo mkdir -p /etc/iptables
sudo ip6tables-save | sudo tee /etc/iptables/ip6tables.rules
```
预览
```console
# /etc/iptables/ip6tables.rules
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [234:29269]
-A INPUT -i lo -j ACCEPT
-A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 1 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 2 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 3 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 4 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 128 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 129 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 134 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 135 -j ACCEPT
-A INPUT -p ipv6-icmp -m icmp6 --icmpv6-type 136 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
COMMIT
```

**2.创建 systemd 服务自动加载规则：**

```bash
sudo systemctl enable iptables.service
sudo systemctl start ip6tables.service
sudo systemctl status ip6tables.service
```

### 6.后续删除新增规则（可选）

验证规则是否生效
```bash
sudo ip6tables -L INPUT -n -v | grep 80

ncat -6vz <ipv6> <port>
```

例如要删除开放 433 端口的规则，可使用 -D 选项：
```bash
sudo ip6tables -D INPUT -p tcp --dport 433 -j ACCEPT

```
新增 TCP 端口 443
```bash
sudo ip6tables -A INPUT -p tcp --dport 443 -j ACCEPT
```

新增 UDP 端口 443（可选）
```bash
sudo ip6tables -A INPUT -p udp --dport 443 -j ACCEPT
```

**保存规则**
```bash
sudo ip6tables-save -f /etc/iptables/ip6tables.rules
```
- 说明：-f 选项指定保存路径，默认路径为 /etc/iptables/

**手动重载 IPv6 规则**
若修改规则后需立即生效，可手动重载：
```bash
sudo ip6tables-restore /etc/iptables/ip6tables.rules
```
---

## ssh

---

### 1. 安装 OpenSSH
```bash
sudo pacman -S openssh
```

---

### 2. 启用并启动 SSH 服务
```bash
# 启用开机自启
sudo systemctl enable sshd

# 立即启动服务
sudo systemctl start sshd
```

---

### 3. 检查服务状态
```bash
sudo systemctl status sshd
```
确认输出显示 `active (running)`。

### 4. 修改 SSH 配置（可选）
编辑配置文件 `/etc/ssh/sshd_config`，按需调整：
```bash
sudo vim /etc/ssh/sshd_config
```
常见修改项：
- **更改端口**：`Port 2222`
- **禁止 root 登录**：`PermitRootLogin no`
- **禁用密码认证（仅用密钥）**：`PasswordAuthentication no`

修改后重启服务：
```bash
sudo systemctl restart sshd
```
---

### 5.测试 SSH 连接
从另一台机器连接：
```bash
ssh 用户名@ArchLinux的IP地址 -p 端口号
```
（默认端口为 `22`，若未修改可省略 `-p` 参数）

---

### 6.生成密钥对（推荐）
为了更安全和便捷地连接，建议使用密钥认证代替密码认证。以下是具体步骤：
生成 SSH 密钥对
在本地终端中执行以下命令来生成 SSH 密钥对：

```bash
ssh-keygen -t rsa -b 4096
```
- -t rsa：指定生成的密钥类型为 RSA。
- -b 4096：指定生成的 RSA 密钥的位数为 4096 位。

将公钥复制到 Arch Linux：
windows可以在 Git Bash 执行
```bash
ssh-copy-id -p 端口号 用户名@ArchLinux的IP地址
```
执行该命令后，输入远程服务器的密码，公钥就会被复制到服务器的~/.ssh/authorized_keys文件中。

---

### 常见问题排查
- **端口未监听**：运行 `ss -tnlp | grep sshd` 检查 22 端口。
- **连接被拒绝**：确保防火墙允许 SSH 端口。
- **日志查看**：`journalctl -u sshd -f` 实时查看日志。

---

## rclone

在 Arch Linux 上安装和配置 `rclone` 可按以下步骤进行：

### 安装 `rclone`
在 Arch Linux 上，你能够借助 `pacman` 包管理器来安装 `rclone`。具体操作如下：
1. **更新系统**：在安装新软件之前，建议先更新系统以确保所有软件包都是最新的。在终端中执行以下命令：
```bash
sudo pacman -Syu
```
此命令会更新所有已安装的软件包到最新版本。
2. **安装 `rclone`**：系统更新完成后，可执行以下命令来安装 `rclone`：
```bash
sudo pacman -S rclone
```
执行该命令后，`pacman` 会自动下载并安装 `rclone` 及其依赖项。
3. **验证安装**：安装完成后，你可以通过以下命令来验证 `rclone` 是否安装成功：
```bash
rclone --version
```
若安装成功，该命令会输出 `rclone` 的版本信息。

### 配置 `rclone`
安装完成后，你需要配置 `rclone` 以连接到你想要使用的云存储服务。以下是配置的步骤：
1. **运行配置向导**：在终端中输入以下命令启动配置向导：
```bash
rclone config
```
2. **创建新的远程配置**：在配置向导中，输入 `n` 并按回车键，选择创建一个新的远程配置。
3. **选择云存储服务**：配置向导会列出支持的云存储服务列表，你可以输入相应的数字来选择你要使用的服务。例如，输入 `1` 选择 Amazon S3，输入 `3` 选择 Google Drive 等（数字对应会不同）。
4. **按照提示进行配置**：根据你选择的云存储服务，配置向导会要求你提供一些必要的信息，如 API 密钥、访问令牌、账户信息等。按照提示输入相应的信息并完成配置。
5. **保存配置**：配置完成后，输入 `y` 并按回车键保存配置。

### 使用示例
配置完成后，你可以使用 `rclone` 来进行文件的上传、下载和同步等操作。以下是一些常见的使用示例：
- **列出远程存储的文件**：
```bash
rclone ls remote_name:
```
其中 `remote_name` 是你在配置中设置的远程存储的名称。
- **上传文件到远程存储**：
```bash
rclone copy local_file remote_name:remote_folder
```
将 `local_file` 替换为你要上传的本地文件的路径，`remote_folder` 替换为你要上传到的远程存储的文件夹路径。
- **从远程存储下载文件**：
```bash
rclone copy remote_name:remote_file local_folder
```
将 `remote_file` 替换为你要下载的远程文件的路径，`local_folder` 替换为你要下载到的本地文件夹路径。

通过以上步骤，你就可以在 Arch Linux 上安装和配置 `rclone`，并使用它来管理你的云存储服务了。

---

## steam++

>安装版本 Steam++_linux_x64_v2.8.6.tar.zst
解压到相应文件夹运行脚本即可


```zsh
# 后台使用
nohup ~/app/steam/Steam++ &

# 程序无法监听 443 端口，请执行下方命令允许程序监听 1024 以下端口( 以上 2.6.9 可用)
sudo setcap cap_net_bind_service=+eip $HOME/app/steam/Steam++

#（避免每次启动关闭加速需要输入密码）请打开终端执行以下命令
sudo chmod a+w /etc/hosts
#（如输入上面命令还提示无法hosts错误请尝试执行下面命令）
sudo chmod a+r /etc/hosts
```
---

## vitepress本地部署

### 1.实现方式

使用 systemd 来管理服务 运行npm run docs:preview

在 /etc/systemd/system/vitepress.service 添加以下内容启动服务即可

```ini
[Unit]
Description=VitePress Server
After=network.target

[Service]
User=your_username  # 替换为你的用户名
WorkingDirectory=/path/to/your/vitepress/project  # 替换为你的 VitePress 项目绝对路径
ExecStartPre=/usr/bin/npm run docs:build  # 先构建
ExecStart=/usr/bin/npm run docs:preview  # 在预览
Restart=always

[Install]
WantedBy=multi-user.target
```
**注意：要删除 # 注释内容**

### 2.相关命令

```bash
# 使用文本编辑器创建服务文件
sudo vim /etc/systemd/system/vitepress.service

# 重新加载 systemd 管理器配置
sudo systemctl daemon-reload

# 启动 VitePress 服务并设置为开机自启
sudo systemctl enable vitepress.service
sudo systemctl start vitepress.service
sudo systemctl status vitepress.service

# 其他操作
sudo systemctl stop vitepress.service
sudo systemctl restart vitepress.service
```
---

## code-server

设置code-server服务保持后台在线
但是到这里还有一个问题，当前这种运行是在前台运行的，不是在后台运行的，如果运行这个code-server的话，就需要保持code-server一直在前台运行，我们的服务器就不能做其他操作了，这时我们需要使用systemctl管理来运行code-server，把code-server变成一个系统服务，可以在后台运行。操作如下：

a、使用cd命令进入 /etc/systemd/system/ 目录下
```zsh
cd /etc/systemd/system/
```
b、使用touch命令新建一个code-server.service文件
```zsh
sudo touch code-server.service
```
c、使用vim编辑code-server.service为如下内容
```zsh
[Unit]
Description=code-server
After=network.target
 
[Service]
Type=exec
ExecStart=/home/weason/app/code-server/bin/code-server
Restart=always
User=weason
 
[Install]
WantedBy=default.target
```

ExecStart是code-server指令所在的地址，咱们的刚刚运行code-server的时输入的linux指令code-server后所执行的就是/home/vscode/code-server-4.9.1-linux-amd64/bin/code-server这个可执行文件

以后就可以以下命令启动、重启、停止或卸载code-server服务了：

启动code-server：
```zsh
sudo systemctl start code-server
```
重启code-server：
```zsh
sudo systemctl status code-server
```

停止code-server：
```zsh
sudo systemctl stop code-server
```
卸载code-server(卸载之前先停止code-server)
```zsh
rm -rf /home/code-server
rm -rf ~/.local/share/code-server
rm -rf ~/.config/code-server
rm -rf /etc/systemd/system/code-server.service
```
---

## kasm
> 下载和安装Kasm
将最新版本的Kasm Workspaces下载到/tmp，提取软件包并运行安装脚本，默认情况下Kasm Workspaces使用443端口，可以通过-L指定自己想用的端口。

```bash
cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.12.0.d4fd8a.tar.gz
tar -xf kasm_release*.tar.gz
sudo bash kasm_release/install.sh -L 8443

```
> 报错
kasm_release/install.sh: line 479: hostname: command not found
这个错误提示表明系统中缺少 hostname 命令。你可以通过安装 inetutils 包来解决这个问题，因为它包含了 hostname 命令。

在 Arch Linux 上安装 inetutils 包的步骤如下：

```bash
sudo pacman -S inetutils
```

安装完成后，再次运行 Kasm Workspaces 的安装脚本：

```bash
sudo bash kasm_release/install.sh -L 8443
```

```zsh
# 开始所有容器
docker start $(docker ps -aqf "name=kasm_*")
# 停止所有容器
docker stop $(docker ps -aqf "name=kasm_*")
# 更改启动方式
docker update --restart=unless-stopped v2raya
```
