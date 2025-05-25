---
title: "Network进阶"
categories:
  - 技术
  - 教程
tags: [Markdown, web]
description: Network进阶
draft: false
sidebar: false
outline: deep
---

# 网络进阶

## 一、网络概念 (Networking Concepts)

### 1.1 OSI 模型 (OSI Model)

*   **定义**: OSI (Open Systems Interconnection) 模型是由国际标准化组织 (ISO) 开发的一个概念模型，描述了计算机网络中通信应如何发生。它为计算机网络通信定义了一个框架。
*   **特性**: 尽管是理论模型，但对于深入理解网络概念至关重要。
*   **七层结构**:

| 层编号 | 层名称       | 主要功能                           | 示例协议和标准                      |
| ------ | ------------ | ---------------------------------- | ----------------------------------- |
| Layer 7 | Application layer | 为应用程序提供服务和接口           | HTTP, FTP, DNS, POP3, SMTP, IMAP |
| Layer 6 | Presentation layer | 数据编码、加密和压缩               | Unicode, MIME, JPEG, PNG, MPEG     |
| Layer 5 | Session layer | 建立、维护和同步会话               | NFS, RPC                            |
| Layer 4 | Transport layer | 端到端通信和数据分段               | UDP, TCP                            |
| Layer 3 | Network layer | 网络间的逻辑寻址和路由             | IP, ICMP, IPSec                     |
| Layer 2 | Data link layer | 相邻节点间的可靠数据传输           | Ethernet (802.3), WiFi (820.11)    |
| Layer 1 | Physical layer | 物理数据传输介质（电气、光学、无线） | Electrical, optical, and wireless signals |

### 1.2 TCP/IP 模型 (TCP/IP Model)

*   **发展历史**: 由国防部 (DoD) 于20世纪70年代开发。
*   **优势**: 允许网络部分功能失常时仍能继续运行（例如，军事攻击后），这得益于路由协议能够适应网络拓扑变化的设计。
*   **四层结构 (从上到下)**:
    *   **Application Layer (应用层)**: 对应 OSI 模型的应用层、表示层和会话层（即第 5、6、7 层）。
    *   **Transport Layer (传输层)**: 对应 OSI 模型的第 4 层。
    *   **Internet Layer (互联网层)**: 对应 OSI 模型的第 3 层，在 TCP/IP 模型中称为互联网层。
    *   **Link Layer (链路层)**: 对应 OSI 模型的第 2 层。

### 1.3 IP 地址和子网 (IP Addresses and Subnets)

*   **IPv4 地址限制**: 0 和 255 通常分别保留给网络地址和广播地址。例如，`192.168.1.0` 是网络地址，`192.168.1.255` 是广播地址。
*   **地址数量**: IPv4 地址数量约为 2^32 (约40亿)，但由于网络地址和广播地址的存在，实际可用数量略少。
*   **私有地址 (Private Addresses)**: RFC 1918 定义了以下三个私有 IP 地址范围：
    *   `10.0.0.0` - `10.255.255.255` (`10/8`)
    *   `172.16.0.0` - `172.31.255.255` (`172.16/12`)
    *   `192.168.0.0` - `192.168.255.255` (`192.168/16`)

### 1.4 UDP 和 TCP (UDP and TCP)

IP 协议允许我们到达网络上的目标主机，但需要传输协议使网络主机上的进程相互通信。主要有两种传输协议：UDP 和 TCP。

#### 1.4.1 UDP (User Datagram Protocol)

*   **特性**: 简单的无连接协议，在传输层（第 4 层）运行。
*   **无连接**: 不需建立连接。
*   **可靠性**: 不提供数据包是否已交付的机制。
*   **端口号**: 用于识别发送和接收进程。端口号范围为 1 到 65535（端口 0 保留）。

#### 1.4.2 TCP (Transmission Control Protocol)

*   **特性**: 面向连接的传输协议。
*   **可靠性**: 使用各种机制确保网络主机上不同进程发送的数据可靠交付。
*   **连接建立**: 需要在发送任何数据之前建立 TCP 连接。
*   **序列号和确认**: 每个数据八位组都有序列号，方便接收方识别丢失或重复的数据包。接收方通过确认号确认数据接收。
*   **三次握手 (Three-way Handshake)**:
    1.  **SYN Packet**: 客户端发送 SYN 包给服务器，包含客户端的初始序列号。
    2.  **SYN-ACK Packet**: 服务器响应 SYN 包，发送 SYN-ACK 包，包含服务器的初始序列号。
    3.  **ACK Packet**: 客户端发送 ACK 包，确认收到 SYN-ACK 包，完成三次握手。

### 1.5 封装 (Encapsulation)

*   **定义**: 指每一层将数据单位（或前一层的数据）接收后，添加自己的头部（有时还有尾部），然后将“封装”后的数据单位发送给下一层的过程。
*   **重要性**: 允许每一层专注于其预期的功能。
*   **封装过程示例 (从上到下)**:
    1.  **Application data (应用数据)**: 用户输入数据，应用程序格式化后通过应用协议发送给传输层。
    2.  **Transport protocol segment or datagram (传输协议分段或数据报)**: 传输层（如 TCP 或 UDP）添加头部信息，创建 TCP 分段或 UDP 数据报，发送给网络层。
    3.  **Network packet (网络包)**: 网络层（即互联网层）为接收到的 TCP 分段或 UDP 数据报添加 IP 头部，创建 IP 包，发送给数据链路层。
    4.  **Data link frame (数据链路帧)**: 数据链路层（如以太网或 WiFi）接收 IP 包，添加适当的头部和尾部，创建帧。
*   **接收端**: 接收端反向执行解封装过程，直到提取出应用数据。

### 1.6 数据包的生命周期 (The Life of a Packet)

以在 TryHackMe 搜索房间为例：

1.  用户在 TryHackMe 搜索页面输入查询并回车。
2.  Web 浏览器使用 HTTPS 准备 HTTP 请求，并将其推送到传输层。
3.  TCP 层通过三次握手与 TryHackMe Web 服务器建立连接。连接建立后，发送包含搜索查询的 HTTP 请求。每个创建的 TCP 分段被发送到互联网层。
4.  IP 层添加源 IP 地址（您的计算机）和目标 IP 地址（TryHackMe Web 服务器）。此数据包被传输到链路层。
5.  链路层添加适当的链路层头部和尾部，数据包发送到路由器。
6.  路由器移除链路层头部和尾部，检查 IP 目标等字段，并将数据包路由到适当的链路。每个路由器重复此过程，直到数据包到达目标服务器的路由器。
7.  数据包到达目标网络路由器后，上述步骤将反向执行。

### 1.7 Telnet

*   **定义**: TELNET (Teletype Network) 协议是一种用于远程终端连接的网络协议。Telnet 客户端允许您连接远程系统并发出文本命令。
*   **用途**: 虽然最初用于远程管理，但 Telnet 也可用于连接任何监听 TCP 端口的服务器。
*   **工作原理**:
    *   基于客户端/服务器模式。
    *   本地计算机运行 Telnet 客户端程序，向目标计算机（运行 Telnet 服务器程序）发起 TCP 连接（默认端口 23）。
    *   连接建立后，用户在本地输入的命令经客户端传输给服务器，服务器执行命令并将结果返回给客户端显示，就像在本地操作目标计算机一样。
*   **优缺点**:
    *   **优点**: 简单易用，几乎所有操作系统都支持；连接速度快，操作界面响应灵敏，适合快速命令行操作。
    *   **缺点**: 所有登录凭证（用户名、密码等）和传输数据都是明文形式，容易被截取，安全性差，易遭受中间人攻击。
*   **替代品**: 随着网络安全需求提升，更安全的 SSH 协议已取代 Telnet 成为远程登录首选，SSH 支持多重身份验证和数据加密传输。但在安全性要求不高的内部网络或特定测试场景中，Telnet 仍有应用。

## 二、网络基础 (Networking Essentials)

### 2.1 DHCP: 自动配置网络设置 (Give Me My Network Settings)

*   **作用**: 当我们想访问网络时，至少需要配置 IP 地址、子网掩码、路由器（或网关）和 DNS 服务器。DHCP (Dynamic Host Configuration Protocol) 是一种应用层协议，依靠 UDP，服务器监听 UDP 端口 67，客户端从 UDP 端口 68 发送。
*   **DHCP DORA 发现过程**:
    1.  **DHCP Discover (发现)**: 客户端广播 DHCPDISCOVER 消息，寻找本地 DHCP 服务器。
    2.  **DHCP Offer (提供)**: 服务器响应 DHCPOFFER 消息，提供一个可用的 IP 地址供客户端接受。
    3.  **DHCP Request (请求)**: 客户端响应 DHCPREQUEST 消息，表明已接受所提供的 IP 地址。
    4.  **DHCP Acknowledge (确认)**: 服务器响应 DHCPACK 消息，确认所提供的 IP 地址已分配给该客户端。
*   **DHCP 包交换特点**:
    *   客户端最初没有 IP 配置，仅有 MAC 地址。在 DHCP Discover 和 DHCP Request 包中，客户端从 IP 地址 `0.0.0.0` 发送到广播 IP 地址 `255.255.255.255`。
    *   在链路层，客户端发送到广播 MAC 地址 `ff:ff:ff:ff:ff:ff`。
    *   DHCP 服务器在 DHCP offer 中提供 IP 地址和网络配置，并使用客户端的目标 MAC 地址。
*   **DHCP 过程结束后的设备配置**: 设备会收到访问网络或互联网所需的所有配置，包括：
    *   租用的 IP 地址。
    *   路由数据包到本地网络之外的网关。
    *   解析域名的 DNS 服务器。

### 2.2 ARP: 连接第三层和第二层寻址 (Bridging Layer 3 Addressing to Layer 2 Addressing)

*   **作用**: 当两个主机在同一以太网或 WiFi 网络上通信时，IP 数据包会被封装在数据链路层帧中。虽然已知目标主机的 IP 地址，但需要查找目标的 MAC 地址以创建正确的数据链路层头部。
*   **MAC 地址**: 48 位数字，通常以十六进制表示，例如 `7C:DF:A1:D3:8C:5C`。
*   **ARP 协议 (Address Resolution Protocol)**: 允许在以太网中查找另一个设备的 MAC 地址。
    *   **ARP Request**: 发送方（如 `192.168.66.89`）广播 ARP Request 询问拥有特定 IP 地址（如 `192.168.66.1`）的主机响应其 MAC 地址。请求从请求者的 MAC 地址发送到广播 MAC 地址 `ff:ff:ff:ff:ff:ff`。
    *   **ARP Reply**: 目标主机响应其 MAC 地址。
*   **封装**: ARP Request 或 ARP Reply 不封装在 UDP 或 IP 包中；它们直接封装在以太网帧中。
*   **定位**: ARP 通常被认为是第 2 层协议（因处理 MAC 地址），但也有人认为它是第 3 层协议的一部分（因支持 IP 操作）。
*   **核心功能**: ARP 实现了从第 3 层寻址到第 2 层寻址的转换。

### 2.3 ICMP: 网络故障排除 (Troubleshooting Networks)

*   **定义**: Internet Control Message Protocol (ICMP) 主要用于网络诊断和错误报告。
*   **常用命令**:
    *   `ping`: 使用 ICMP 测试与目标系统的连接性，并测量往返时间 (RTT)。用于确认目标是否存活且可达。
        *   发送 ICMP Echo Request (ICMP Type `8`)。
        *   接收方响应 ICMP Echo Reply (ICMP Type `0`)。
    *   `traceroute` (Linux/UNIX) / `tracert` (MS Windows): 使用 ICMP 发现从您的主机到目标的路由路径。
        *   利用 IP 数据包头中的 Time-to-Live (TTL) 字段。
        *   路由器每次转发数据包时将 TTL 减 1。
        *   当 TTL 达到零时，路由器丢弃数据包并发送 ICMP Time Exceeded 消息 (ICMP Type `11`)。
*   **TTL (Time To Live)**:
    *   **作用**: IP 数据包头中的字段，限制数据包在网络中被转发的次数，防止无限循环。每经过一个路由器 (跳数)，TTL 减 1。当 TTL 减到 0 时，数据包被丢弃，并返回 ICMP 超时消息。
    *   **在 ping 结果中的含义**: TTL 数值越大，说明数据包经过的路由器（跳数）越少，目标主机离你越近。
    *   **常见初始值**: Windows 默认 128，Linux/Unix 默认 64，部分设备为 255。

### 2.4 路由 (Routing)

*   **定义**: 在网络中确定数据包从源地址到目标地址的传输路径的过程。
*   **网络路由**: 路由器根据目标 IP 地址选择最佳路径，将数据包转发到下一个网络节点。
    *   路由协议 (如 RIP, OSPF, BGP) 用于路由器之间交换路由信息，构建路由表，以便做出最佳的转发决策。
*   **Web 应用程序路由**: 根据用户请求的 URL，将请求映射到相应的处理程序（例如，控制器方法或视图）。
    *   Web 框架 (如 Django, Flask, Rails) 提供路由功能，确保数据高效、准确地到达目的地。
*   **常见路由协议**:
    *   **OSPF (Open Shortest Path First)**: 允许路由器共享网络拓扑信息，计算最有效的数据传输路径。
    *   **EIGRP (Enhanced Interior Gateway Routing Protocol)**: Cisco 专有路由协议，结合了不同路由算法的特点，根据成本（如带宽或延迟）选择最有效路径。
    *   **BGP (Border Gateway Protocol)**: 互联网上主要的路由协议，允许不同网络（如 ISP）交换路由信息，建立数据传输路径。
    *   **RIP (Routing Information Protocol)**: 简单路由协议，常用于小型网络。路由器共享可达网络信息及跳数，选择跳数最少的路径。

### 2.5 NAT (Network Address Translation)

*   **定义**: 一种网络技术，用于在局域网（内网）和广域网（外网/互联网）之间转换 IP 地址。
*   **主要作用**:
    *   允许多个内网设备通过一个（或少量）公网 IP 地址访问互联网。
    *   节省公网 IP 地址资源，提升网络安全性（内网地址对外不可见）。
*   **背景**: 应对 IPv4 地址枯竭的解决方案之一。
*   **工作原理**: NAT 路由器维护一个转换表，将内部 IP 地址和端口号映射到其外部 IP 地址和端口号，实现地址的无缝转换。
*   **与 DHCP 的关系**: DHCP 负责为内网设备分配私有 IP 地址，NAT 则负责将这些私有 IP 转换为公网 IP 以访问互联网。两者通常由同一路由器或网关设备实现，协同工作。

## 三、网络核心协议 (Networking Core Protocols)

### 3.1 DNS: 记住地址 (Remembering Addresses)

*   **参考**: 详情见 [DNS in Detail](https://withoutsolution.pages.dev/cyber/web#dns-in-detail)。

### 3.2 WHOIS

*   **作用**: 用于查询域名注册信息。
*   **示例 (Linux 命令)**:
    ```bash
    root@ip-10-10-163-23:~# whois x.com
       Domain Name: X.COM
       Registry Domain ID: 1026563_DOMAIN_COM-VRSN
       Registrar WHOIS Server: whois.godaddy.com
       Registrar URL: http://www.godaddy.com
       Updated Date: 2024-12-03T21:03:37Z
       Creation Date: 1993-04-02T05:00:00Z
       Registry Expiry Date: 2034-10-20T19:56:17Z
       Registrar: GoDaddy.com, LLC
       Registrar IANA ID: 146
       Registrar Abuse Contact Email: abuse@godaddy.com
       Registrar Abuse Contact Phone: 480-624-2505
    ```

### 3.3 HTTP(S): 访问 Web (Accessing the Web)

*   **参考**: 详情见 [HTTP in detail](https://withoutsolution.pages.dev/cyber/web#http-in-detail)。
*   **使用 Telnet 访问 HTTP 示例**:
    *   **请求根路径**:
        ```bash
        root@ip-10-10-151-56:~# telnet 10.10.106.125 80
        Trying 10.10.106.125...
        Connected to 10.10.106.125.
        Escape character is '^]'.
        GET / HTTP/1.1
        Host: anything

        HTTP/1.1 200 OK
        Server: nginx/1.18.0 (Ubuntu)
        Date: Sat, 10 May 2025 15:16:57 GMT
        Content-Type: text/html
        Content-Length: 2252
        Last-Modified: Thu, 27 Jun 2024 06:58:01 GMT
        Connection: keep-alive
        ETag: "667d0d79-8cc"
        Accept-Ranges: bytes

        <!DOCTYPE html>
        <html lang="en">
        <head>
        ```
    *   **请求 `flag.html`**:
        ```bash
        root@ip-10-10-151-56:~# telnet 10.10.106.125 80
        Trying 10.10.106.125...
        Connected to 10.10.106.125.
        Escape character is '^]'.
        GET /flag.html HTTP/1.1
        Host: anything

        HTTP/1.1 200 OK
        Server: nginx/1.18.0 (Ubuntu)
        Date: Sat, 10 May 2025 15:20:46 GMT
        Content-Type: text/html
        Content-Length: 478
        Last-Modified: Thu, 27 Jun 2024 07:28:15 GMT
        Connection: keep-alive
        ETag: "667d148f-1de"
        Accept-Ranges: bytes

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hidden Message</title>
            <style>
                body {
                    background-color: white;
                    color: white;
                    font-family: Arial, sans-serif;
                }
                .hidden-text {
                    font-size: 1px;
                }
            </style>
        </head>
        <body>
            <div class="hidden-text">THM{TELNET-HTTP}</div>
        </body>
        </html>
        ```
        *   **隐藏标志**: `THM{TELNET-HTTP}`

### 3.4 FTP: 文件传输 (Transferring Files)

*   **定义**: File Transfer Protocol (FTP) 是一种旨在帮助不同甚至不兼容系统之间高效传输文件的协议。
*   **文件传输模式**: 支持二进制 (binary) 和 ASCII (text) 两种模式。
*   **效率**: 相较于 HTTP，FTP 更高效，在同等条件下可实现更高传输速度。
*   **常用命令**:
    *   `USER`: 输入用户名。
    *   `PASS`: 输入密码。
    *   `RETR` (retrieve): 从 FTP 服务器下载文件到客户端。
    *   `STOR` (store): 从客户端上传文件到 FTP 服务器。
*   **端口**: FTP 服务器默认监听 TCP 端口 21；数据传输通过客户端到服务器的另一个连接进行。
*   **FTP 客户端交互示例**:
    ```bash
    root@ip-10-10-151-56:~# ftp 10.10.106.125
    Connected to 10.10.106.125.
    220 (vsFTPd 3.0.5)
    Name (10.10.106.125:root): anonymous
    331 Please specify the password.
    Password:
    230 Login successful.
    Remote system type is UNIX.
    Using binary mode to transfer files.
    ftp> ls
    200 PORT command successful. Consider using PASV.
    150 Here comes the directory listing.
    -rw-r--r--    1 0        0            1480 Jun 27  2024 coffee.txt
    -rw-r--r--    1 0        0              14 Jun 27  2024 flag.txt
    -rw-r--r--    1 0        0            1595 Jun 27  2024 tea.txt
    226 Directory send OK.
    ftp> type ascii
    200 Switching to ASCII mode.
    ftp> get coffee.txt
    local: coffee.txt remote: coffee.txt
    200 PORT command successful. Consider using PASV.
    150 Opening BINARY mode data connection for coffee.txt (1480 bytes).
    WARNING! 47 bare linefeeds received in ASCII mode
    File may not have transferred correctly.
    226 Transfer complete.
    1480 bytes received in 0.00 secs (2.5616 MB/s)
    ftp> quit
    221 Goodbye.
    ```
*   **Wireshark 分析**: 客户端命令（如 `ls` 对应 `LIST`）与服务器响应不同。目录列表和下载文件通过单独连接发送。

### 3.5 SMTP: 发送邮件 (Sending Email)

*   **定义**: Simple Mail Transfer Protocol (SMTP) 是一种用于将电子邮件发送到 SMTP 服务器（更具体地说是邮件提交代理 MSA 或邮件传输代理 MTA）的协议。
*   **类比**: 类似去邮局寄包裹，需要打招呼、提供目的地、发件人信息等。
*   **常用命令**:
    *   `HELO` 或 `EHLO`: 启动 SMTP 会话。
    *   `MAIL FROM`: 指定发件人电子邮件地址。
    *   `RCPT TO`: 指定收件人电子邮件地址。
    *   `DATA`: 指示客户端将开始发送电子邮件内容。
    *   `.`: 单独一行发送，表示电子邮件消息结束。
*   **端口**: SMTP 服务器默认监听 TCP 端口 25。
*   **Telnet 发送邮件示例**:
    ```bash
    root@ip-10-10-151-56:~# telnet 10.10.106.125 25
    Trying 10.10.106.125...
    Connected to 10.10.106.125.
    Escape character is '^]'.
    220 example.thm ESMTP Exim 4.95 Ubuntu Sat, 10 May 2025 16:11:28 +0000
    HELO client.thm
    250 example.thm Hello client.thm [10.10.151.56]
    MAIL FROM: <user@client.thm>
    250 OK
    RCPT TO: <strategos@server.thm>
    250 Accepted
    DATA
    354 Enter message, ending with "." on a line by itself
    From: user@client.thm
    To: strategos@server.thm
    Subject: Telnet email

    Hello. I am using telnet to send you an email!
    .
    250 OK id=1uDmoT-0000LX-Eq
    quit
    221 example.thm closing connection
    Connection closed by foreign host.
    ```
*   **Wireshark 分析**: 客户端消息为红色，服务器响应为蓝色。

### 3.6 POP3: 接收邮件 (Receiving Email)

*   **定义**: Post Office Protocol Version 3 (POP3) 是一种用于接收电子邮件的协议，它将电子邮件从服务器下载到本地设备。
*   **特性**: 使用 POP3，收件人无法从不同设备再次访问其电子邮件，因为邮件下载到本地后会从服务器删除。
*   **与 SMTP 关系**: SMTP 类似寄包裹，POP3 类似查收邮件。
*   **常用命令**:
    *   `USER <username>`: 识别用户。
    *   `PASS <password>`: 提供用户密码。
    *   `STAT`: 请求消息数量和总大小。
    *   `LIST`: 列出所有消息及其大小。
    *   `RETR <message_number>`: 检索指定消息。
    *   `DELE <message_number>`: 标记消息删除。
    *   `QUIT`: 结束 POP3 会话并应用更改。
*   **端口**: POP3 服务器默认监听 TCP 端口 110。
*   **Telnet 接收邮件示例**:
    ```bash
    user@TryHackMe$ telnet 10.10.106.125 110
    Trying 10.10.106.125...
    Connected to 10.10.106.125.
    Escape character is '^]'.
    +OK [XCLIENT] Dovecot (Ubuntu) ready.
    AUTH
    +OK
    PLAIN
    .
    USER strategos
    +OK
    PASS
    +OK Logged in.
    STAT
    +OK 3 1264
    LIST
    +OK 3 messages:
    1 407
    2 412
    3 445
    .
    RETR 3
    +OK 445 octets
    Return-path: <user@client.thm>
    Envelope-to: strategos@server.thm
    Delivery-date: Thu, 27 Jun 2024 16:19:35 +0000
    Received: from [10.11.81.126] (helo=client.thm)
            by example.thm with smtp (Exim 4.95)
            (envelope-from <user@client.thm>)
            id 1sMrpq-0001Ah-UT
            for strategos@server.thm;
            Thu, 27 Jun 2024 16:19:35 +0000
    From: user@client.thm
    To: strategos@server.thm
    Subject: Telnet email

    Hello. I am using telnet to send you an email!
    .
    QUIT
    +OK Logging out.
    Connection closed by foreign host.
    ```
*   **安全性**: 截获网络数据包者可读取明文密码和通信内容。

### 3.7 IMAP: 同步邮件 (Synchronizing Email)

*   **定义**: Internet Message Access Protocol (IMAP) 是一种用于接收电子邮件的协议。它允许计算机和服务器之间连接，无论它们使用相同或不同的硬件或软件。
*   **优势**: 当您需要从多个设备（如办公电脑、笔记本、智能手机）检查电子邮件时，IMAP 允许邮件同步，而不是检索后删除。
*   **特性**:
    *   同步已读、已移动和已删除的消息。
    *   当通过多个客户端检查电子邮件时非常方便。
    *   通常比 POP3 使用更多服务器存储空间，因为邮件保留在服务器上并跨客户端同步。
*   **常用命令 (比 POP3 复杂)**:
    *   `LOGIN <username> <password>`: 验证用户。
    *   `SELECT <mailbox>`: 选择要处理的邮箱文件夹。
    *   `FETCH <mail_number> <data_item_name>`: 检索指定消息（例: `fetch 3 body[]` 检索消息 3 的头部和正文）。
    *   `MOVE <sequence_set> <mailbox>`: 将指定消息移动到另一个邮箱。
    *   `COPY <sequence_set> <data_item_name>`: 将指定消息复制到另一个邮箱。
    *   `LOGOUT`: 注销。
*   **端口**: IMAP 服务器默认监听 TCP 端口 143。
*   **Telnet 接收邮件示例**:
    ```bash
    user@TryHackMe$ telnet 10.10.41.192 143
    Trying 10.10.41.192...
    Connected to 10.10.41.192.
    Escape character is '^]'.
    * OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ STARTTLS AUTH=PLAIN] Dovecot (Ubuntu) ready.
    A LOGIN strategos
    A OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE SORT SORT=DISPLAY THREAD=REFERENCES THREAD=REFS THREAD=ORDEREDSUBJECT MULTIAPPEND URL-PARTIAL CATENATE UNSELECT CHILDREN NAMESPACE UIDPLUS LIST-EXTENDED I18NLEVEL=1 CONDSTORE QRESYNC ESEARCH ESORT SEARCHRES WITHIN CONTEXT=SEARCH LIST-STATUS BINARY MOVE SNIPPET=FUZZY PREVIEW=FUZZY PREVIEW STATUS=SIZE SAVEDATE LITERAL+ NOTIFY SPECIAL-USE] Logged in
    B SELECT inbox
    * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
    * OK [PERMANENTFLAGS (\Answered \Flagged \Deleted \Seen \Draft \*)] Flags permitted.
    * 4 EXISTS
    * 0 RECENT
    * OK [UNSEEN 2] First unseen.
    * OK [UIDVALIDITY 1719824692] UIDs valid
    * OK [UIDNEXT 5] Predicted next UID
    B OK [READ-WRITE] Select completed (0.001 + 0.000 secs).
    C FETCH 3 body[]
    * 3 FETCH (BODY[] {445}
    Return-path: <user@client.thm>
    Envelope-to: strategos@server.thm
    Delivery-date: Thu, 27 Jun 2024 16:19:35 +0000
    Received: from [10.11.81.126] (helo=client.thm)
            by example.thm with smtp (Exim 4.95)
            (envelope-from <user@client.thm>)
            id 1sMrpq-0001Ah-UT
            for strategos@server.thm;
            Thu, 27 Jun 2024 16:19:35 +0000
    From: user@client.thm
    To: strategos@server.thm
    Subject: Telnet email

    Hello. I am using telnet to send you an email!
    )
    C OK Fetch completed (0.001 + 0.000 secs).
    D LOGOUT
    * BYE Logging out
    D OK Logout completed (0.001 + 0.000 secs).
    Connection closed by foreign host.
    ```
*   **安全性**: 截获流量者仍可阅读明文密码和通信内容。

### 3.8 核心协议端口总结

| 协议     | 传输协议 | 默认端口号 |
| -------- | -------- | ---------- |
| TELNET   | TCP      | 23         |
| DNS      | UDP or TCP | 53         |
| HTTP     | TCP      | 80         |
| HTTPS    | TCP      | 443        |
| FTP      | TCP      | 21         |
| SMTP     | TCP      | 25         |
| POP3     | TCP      | 110        |
| IMAP     | TCP      | 143        |

## 四、网络安全协议 (Networking Secure Protocols)

关注机密性 (confidentiality)、完整性 (integrity) 和真实性 (authenticity)。

### 4.1 TLS (Transport Layer Security)

*   **定义**: TLS (Transport Layer Security) 是一种用于保护网络通信安全的加密协议。它是 SSL (Secure Sockets Layer) 的继任者，常用于为 HTTP, SMTP, IMAP, POP3 等协议提供加密和身份验证。
*   **主要作用**:
    *   加密数据，防止被窃听。
    *   确保数据完整性，防止被篡改。
    *   验证通信双方身份，防止中间人攻击。
*   **常见应用**:
    *   HTTPS (HTTP over TLS): 保护网页浏览安全。
    *   邮件传输加密 (如 SMTPS, IMAPS, POP3S)。
    *   VPN、即时通讯等安全通信场景。
*   **CA (Certificate Authority)**:
    *   **定义**: 一个受信任的组织，通过颁发数字证书来验证网站、个人或公司等实体的数字身份。
    *   **证书获取流程**: 服务器（或客户端）管理员创建证书签名请求 (CSR) 并提交给 CA；CA 验证 CSR 并颁发数字证书。一旦收到（签名）证书，即可用于向他人识别服务器（或客户端），他人可通过验证签名确认其有效性。
    *   **免费证书**: Let’s Encrypt 提供免费证书签名服务。
    *   **自签名证书**: 无法证明服务器的真实性，因没有第三方验证。

### 4.2 HTTPS

*   **HTTP 问题**: HTTP 依赖 TCP，默认使用端口 80。所有 HTTP 流量都是明文发送，易于被截获和监控。
*   **传统 HTTP 请求步骤 (域名解析后)**:
    1.  与目标服务器建立 TCP 三次握手。
    2.  使用 HTTP 协议进行通信（例如，发出 `GET / HTTP/1.1` 请求）。
*   **HTTP Over TLS (HTTPS)**: Hypertext Transfer Protocol Secure。
*   **HTTPS 请求步骤 (域名解析后)**:
    1.  与目标服务器建立 TCP 三次握手。
    2.  建立 TLS 会话（TLS 协商和建立在此阶段进行）。
    3.  使用 HTTP 协议进行通信（例如，发出 `GET / HTTP/1.1` 请求），但数据已加密。
*   **加密性**: 所有数据包都被加密。在没有私钥的情况下，无法查看交换的数据包内容。
*   **解密 (需要私钥)**: 如果提供解密密钥给 Wireshark，可以看到正常的 HTTP 流量，证实 TLS 提供了安全性。
*   **核心要点**: TLS 为 HTTP 提供了安全性，无需修改底层或上层协议（TCP 和 IP 未修改，HTTP 像在 TCP 上一样通过 TLS 发送）。

### 4.3 其他协议的安全性 (Others)

*   **SMTP, POP3, IMAP 的 TLS 加密**: 与 HTTP 添加 TLS 类似，这些协议也通过 TLS 变得安全。
    *   SMTP 变为 SMTPS。
    *   POP3 变为 POP3S。
    *   IMAP 变为 IMAPS。
*   **端口变化**: 安全版本使用不同的默认 TCP 端口号：

| 协议     | 非安全端口 | 安全端口     |
| -------- | ---------- | ------------ |
| HTTP(S)  | 80         | 443          |
| SMTP(S)  | 25         | 465 and 587 |
| POP3(S)  | 110        | 995          |
| IMAP(S)  | 143        | 993          |
| FTS(S)   | 21         | 990          |

### 4.4 SSH (Secure Shell)

*   **定义**: Secure Shell (SSH) 是一种加密网络协议，用于设备之间的安全通信。SSH 使用密码学算法（如 AES）加密数据，常用于远程登录计算机或服务器。
*   **优势 (OpenSSH)**:
    *   **安全认证**: 支持密码、公钥和双因素认证。
    *   **机密性**: 提供端到端加密，防止窃听。通过新服务器密钥通知防止中间人攻击。
    *   **完整性**: 密码学保护交换数据的完整性。
    *   **隧道**: SSH 可创建安全“隧道”来路由其他协议，实现类似 VPN 的连接。
    *   **X11 Forwarding**: 如果连接到具有图形用户界面的 Unix-like 系统，SSH 允许通过网络使用图形应用程序。
*   **端口**: SSH 服务器监听 TCP 端口 22 (Telnet 监听端口 23)。

### 4.5 SFTP 和 FTPS

*   **SFTP (SSH File Transfer Protocol)**:
    *   允许安全文件传输。
    *   是 SSH 协议套件的一部分，共享 SSH 端口 22。
    *   连接命令示例: `sftp username@hostname`。
    *   常用命令: `get filename` (下载), `put filename` (上传)。
    *   命令通常类似于 Unix 命令，可能与 FTP 命令不同。
*   **FTPS (File Transfer Protocol Secure)**:
    *   通过 TLS 协议实现安全传输。
    *   FTP 使用端口 21，FTPS 通常使用端口 990。
    *   需要证书设置，且由于控制和数据传输使用单独连接，可能难以在严格防火墙后允许。
*   **区分**: SFTP 是基于 SSH 的安全文件传输，FTPS 是基于 TLS 的安全文件传输。

### 4.6 VPN (Virtual Private Network)

*   **基本概念**: 当互联网设计时，TCP/IP 协议套件专注于数据包交付，但未提供机制来确保所有进出计算机的数据都受到保护，防止泄露和篡改。VPN 连接应运而生。
*   **目的**: 强调 VPN 中的“私人”特性，实现虚拟网络中的“私人”信息交换。
*   **解决方案**: 提供方便且相对便宜的解决方案，主要要求是互联网连接和 VPN 服务器/客户端。
*   **工作原理**:
    *   远程分支机构的 VPN 客户端连接到主分支机构的 VPN 服务器。
    *   VPN 客户端加密流量并通过建立的 VPN 隧道（蓝色线）传输到主分支机构。
    *   VPN 流量限于隧道内，隧道外（绿色线）则携带解密的 VPN 流量。
    *   VPN 也可用于单个设备连接。
*   **注意事项**:
    *   并非所有 VPN 连接都会路由所有流量。
    *   一些 VPN 服务器可能泄露您的实际 IP 地址。
    *   可能需要进行 DNS 泄露测试。

## 五、常见问题解答 (FAQ)

**Q1: OSI 模型和 TCP/IP 模型之间有什么主要区别？**
A1: OSI 模型是一个理论性的七层模型，详细描述了网络通信的各个方面。TCP/IP 模型是一个更实用的四层（或五层）模型，它是互联网协议的基础，其层级结构与 OSI 模型有所映射，但更侧重于实际应用。

**Q2: TCP 和 UDP 之间最关键的区别是什么？**
A2: TCP 是面向连接的、可靠的传输协议，通过三次握手建立连接，并提供数据序列号和确认机制以确保数据完整和有序传输。UDP 是无连接的、不可靠的协议，不保证数据传输的可靠性、顺序性或完整性，但传输速度更快，开销更低。

**Q3: 什么是三次握手，它用在哪种协议中？**
A3: 三次握手是 TCP 协议用于建立可靠连接的过程。它涉及客户端发送 SYN 包，服务器响应 SYN-ACK 包，客户端最后发送 ACK 包以完成连接建立。

**Q4: 封装 (Encapsulation) 在网络中是如何发生的？**
A4: 封装是指在网络通信中，每一层协议在接收到上层数据后，会添加自己的协议头部（有时还有尾部），然后将这个新的数据单元传递给下一层。这个过程从应用层开始，逐层向下进行，直到物理层发送比特流。接收端则反向执行解封装。

**Q5: DHCP DORA 过程的四个步骤是什么？**
A5: DHCP DORA 过程包括：
    1.  **Discover**: 客户端广播消息寻找 DHCP 服务器。
    2.  **Offer**: 服务器提供一个 IP 地址给客户端。
    3.  **Request**: 客户端请求接受该 IP 地址。
    4.  **Acknowledge**: 服务器确认分配该 IP 地址。

**Q6: ARP (Address Resolution Protocol) 的主要功能是什么？**
A6: ARP 的主要功能是在局域网（如以太网）中，将第三层（IP 地址）转换为第二层（MAC 地址）。当一个设备需要与同一网络内的另一个设备通信时，它使用 ARP 来查找目标设备的 MAC 地址。

**Q7: `ping` 和 `traceroute` 命令各有什么用途？**
A7: `ping` 命令使用 ICMP Echo Request 和 Echo Reply 来测试与目标主机的连通性，并测量往返时间，确认目标是否存活。`traceroute` (或 `tracert`) 命令使用 ICMP 和 IP 包的 TTL 字段来发现从源到目标的网络路径，显示数据包经过的每个路由器（跳）。

**Q8: 什么是 TTL，它在网络中的作用是什么？**
A8: TTL (Time To Live) 是 IP 数据包头中的一个字段，用于限制数据包在网络中被转发的次数。每经过一个路由器，TTL 值减 1。当 TTL 减到 0 时，数据包被丢弃，以防止数据包无限循环，并返回 ICMP 超时消息。

**Q9: NAT (Network Address Translation) 的核心作用是什么？**
A9: NAT 的核心作用是在局域网（私有 IP 地址）和广域网（公网 IP 地址）之间进行地址转换。它允许多个内网设备共享一个或少量公网 IP 地址访问互联网，从而节省公网 IP 资源并提高网络安全性。

**Q10: HTTP 和 HTTPS 之间的主要区别是什么？**
A10: HTTP 是明文传输的 Web 协议，数据在网络中不加密。HTTPS 是 HTTP over TLS（或 SSL），通过传输层安全协议对数据进行加密，提供数据机密性、完整性保障和服务器身份认证，使得通信更加安全。

**Q11: Telnet 和 SSH 相比，为什么 SSH 是更好的选择？**
A11: Telnet 是一个明文传输协议，所有数据（包括登录凭证）都以未加密的形式发送，极易被窃听。SSH (Secure Shell) 则是一个加密网络协议，它对所有数据进行加密，提供安全认证、机密性、完整性以及隧道功能，因此在安全性方面远优于 Telnet。

**Q12: FTP 和 SFTP/FTPS 有何不同？**
A12: FTP (File Transfer Protocol) 是一个明文传输的文件传输协议。SFTP (SSH File Transfer Protocol) 是基于 SSH 的安全文件传输协议，继承了 SSH 的加密和认证能力，通常使用端口 22。FTPS (File Transfer Protocol Secure) 是基于 TLS/SSL 的安全文件传输协议，通常使用端口 990，需要证书。SFTP 和 FTPS 都提供比 FTP 更安全的传输方式。

**Q13: VPN (Virtual Private Network) 的主要目的是什么？**
A13: VPN 的主要目的是在一个不安全的公共网络（如互联网）上，创建一个安全的、加密的“私人”网络连接。它通过加密数据、验证用户身份和隧道技术，确保数据传输的机密性、完整性和真实性，常用于企业远程访问或个人隐私保护。