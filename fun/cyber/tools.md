---
title: "tools"
categories:
  - 技术
  - 教程
tags: [Markdown, web]
draft: true
sidebar: false
outline: deep
---

# tools

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

---

## Wireshark

Wireshark is an open-source, cross-platform network packet analyser tool capable of sniffing and investigating live traffic and inspecting packet captures (PCAP). It is commonly used as one of the best packet analysis tools.

**Packet capture (PCAP)** is a networking practice involving the interception of data packets travelling over a network. Once the packets are captured, they can be stored by IT teams for further analysis. The inspection of these packets allows IT teams to identify issues and solve network problems affecting daily operations.

### Packet Dissection

Packet dissection is also known as protocol dissection, which investigates packet details by decoding available protocols and fields. Wireshark supports a long list of protocols for dissection, and you can also write your dissection scripts. You can find more details on dissection [here](https://github.com/boundary/wireshark/blob/master/doc/README.dissector).

**Note:** This section covers how Wireshark uses OSI layers to break down packets and how to use these layers for analysis.


<span style="font-size: 23px;">**Packet Details**</span>

You can click on a packet in the packet list pane to open its details (double-click will open details in a new window). Packets consist of 5 to 7 layers based on the OSI model.

![packet details](<assets/packet details.png>)

We can see seven distinct layers to the packet: frame/packet, source [MAC], source [IP], protocol, protocol errors, application protocol, and application data. Below we will go over the layers in more detail.

**The Frame (Layer 1):** This will show you what frame/packet you are looking at and details specific to the Physical layer of the OSI model.

![The Frame (Layer 1)](<assets/The Frame (Layer 1).png>)

**Source [MAC] (Layer 2):** This will show you the source and destination MAC Addresses; from the Data Link layer of the OSI model.

![Source [MAC] (Layer 2)](<assets/Source [MAC] (Layer 2).png>)

**Source [IP] (Layer 3):** This will show you the source and destination IPv4 Addresses; from the Network layer of the OSI model.

![Source [IP] (Layer 3)](<assets/Source [IP] (Layer 3).png>)

**Protocol (Layer 4):** This will show you details of the protocol used (UDP/TCP) and source and destination ports; from the Transport layer of the OSI model.

![Protocol (Layer 4)](<assets/Protocol (Layer 4).png>)

**Protocol Errors:** This continuation of the 4th layer shows specific segments from TCP that needed to be reassembled.

![Protocol Errors](<assets/Protocol Errors.png>)

**Application Protocol (Layer 5):** This will show details specific to the protocol used, such as HTTP, FTP,  and SMB. From the Application layer of the OSI model.

![Application Protocol (Layer 5)](<assets/Application Protocol (Layer 5).png>)

**Application Data:** This extension of the 5th layer can show the application-specific data.

![Application Data](<assets/Application Data.png>)

### Packet Nivagation

<span style="font-size: 23px;">**Export Objects (Files)**</span>

Wireshark can extract files transferred through the wire. For a security analyst, it is vital to discover shared files and save them for further investigation. Exporting objects are available only for selected protocol's streams (DICOM, HTTP, IMF, SMB and TFTP).

![wireshark Export Objects](<assets/wireshark Export Objects.png>)

<span style="font-size: 23px;">**Expert Info**</span>

Wireshark also detects specific states of protocols to help analysts easily spot possible anomalies and problems. Note that these are only suggestions, and there is always a chance of having false positives/negatives. Expert info can provide a group of categories in three different severities. Details are shown in the table below.

<div align=left><img src = './assets/20250512_111317.png'></div>

### Packet Filtering  

Wireshark has a powerful filter engine that helps analysts to narrow down the traffic and focus on the event of interest. Wireshark has two types of filtering approaches: capture and display filters. Capture filters are used for "**capturing**" only the packets valid for the used filter. Display filters are used for "**viewing**" the packets valid for the used filter. We will discuss these filters' differences and advanced usage in the next room. Now let's focus on basic usage of the display filters, which will help analysts in the first place.

Filters are specific queries designed for protocols available in Wireshark's official protocol reference. While the filters are only the option to investigate the event of interest, there are two different ways to filter traffic and remove the noise from the capture file. The first one uses queries, and the second uses the right-click menu. Wireshark provides a powerful GUI, and <u>there is a golden rule for analysts who don't want to write queries for basic tasks</u>: "**If you can click on it, you can filter and copy it**"


<span style="font-size: 23px;">**Follow Stream**</span>

Wireshark displays everything in packet portion size. However, it is possible to reconstruct the streams and view the raw traffic as it is presented at the application level. Following the protocol, streams help analysts recreate the application-level data and understand the event of interest. It is also possible to view the unencrypted protocol data like usernames, passwords and other transferred data.

You can use the"right-click menu" or  "`Analyse --> Follow TCP/UDP/HTTP Stream`" menu to follow traffic streams. Streams are shown in a separate dialogue box; packets originating from the server are highlighted with blue, and those originating from the client are highlighted with red.

![follow stream](<assets/wireshark follow stream.png>)

## Tcpdump

The Tcpdump tool and its `libpcap` library are written in C and C++ and were released for Unix-like systems in the late 1980s or early 1990s. Consequently, they are very stable and offer optimal speed. The libpcap library is the foundation for various other networking tools today. Moreover, it was ported to MS Windows as winpcap.

### Basic Packet Capture

You can run `tcpdump` without providing any arguments; however, this is only useful to test that you have it installed! In any real scenario, we must be specific about what to listen to, where to write, and how to display the packets.

| Command              | Explanation                                                |
|----------------------|------------------------------------------------------------|
| `tcpdump -i INTERFACE`| Captures packets on a specific network interface           |
| `tcpdump -w FILE`    | Writes captured packets to a file                          |
| `tcpdump -r FILE`    | Reads captured packets from a file                         |
| `tcpdump -c COUNT`   | Captures a specific number of packets                      |
| `tcpdump -n`         | Don't resolve IP addresses, i.e. not display hostname             |
| `tcpdump -nn`        | Don't resolve IP addresses and don't resolve protocol numbers |
| `tcpdump -v`         | Verbose display; verbosity can be increased with `-vv` and `-vvv` |

Consider the following examples:

- `tcpdump -i eth0 -c 50 -v` captures and displays 50 packets by listening on the `eth0` interface, which is a wired Ethernet, and displays them verbosely.
- `tcpdump -i wlo1 -w data.pcap` captures packets by listening on the `wlo1` interface (the WiFi interface) and writes the packets to `data.pcap`. It will continue till the user interrupts the capture by pressing CTRL-C.
- `tcpdump -i any -nn` captures packets on all interfaces and displays them on screen without domain name or protocol resolution.

### Filtering Expressions

<span style="font-size: 23px;">**Logical Operators**</span>
Three logical operators that can be handy:

- `and`: Captures packets where both conditions are true. For example, `tcpdump host 1.1.1.1 and tcp` captures `tcp` traffic with `host 1.1.1.1`.
- `or`: Captures packets when either one of the conditions is true. For instance, `tcpdump udp or icmp` captures UDP or ICMP traffic.
- `not`: Captures packets when the condition is not true. For example, tcpdump not tcp captures all packets except TCP segments; we expect to find `UDP`, `ICMP`, and `ARP` packets among the results.

| Command                                        | Explanation                                              |
|------------------------------------------------|----------------------------------------------------------|
| `tcpdump host IP` 或 `tcpdump host HOSTNAME`    | Filters packets by IP address or hostname                |
| `tcpdump src host IP` 或                       | Filters packets by a specific source host                |
| `tcpdump dst host IP`                          | Filters packets by a specific destination host           |
| `tcpdump port PORT_NUMBER`                     | Filters packets by port number                            |
| `tcpdump src port PORT_NUMBER`                 | Filters packets by the specified source port number       |
| `tcpdump dst port PORT_NUMBER`                 | Filters packets by the specified destination port number |
| `tcpdump PROTOCOL`                             | Filters packets by protocol; examples include `ip`, `ip6`, `udp`, `tcp`, and `icmp` | 

Consider the following examples:

- `tcpdump -i any tcp port 22` listens on all interfaces and captures `tcp` packets to or from `port 22`, i.e., SSH traffic.
- `tcpdump -i wlo1 udp port 123` listens on the WiFi network card and filters `udp` traffic to `port 123`, the Network Time Protocol (NTP).
- `tcpdump -i eth0 host example.com and tcp port 443 -w https.pcap` will listen on `eth0`, the wired Ethernet interface and filter traffic exchanged with `example.com` that uses `tcp` and `port 443`. In other words, this command is filtering HTTPS traffic related to `example.com`.

 you can count the lines by piping the output via the `wc` command

```bash
user@TryHackMe$ tcpdump -r traffic.pcap src host 192.168.124.1 -n | wc
reading from file traffic.pcap, link-type EN10MB (Ethernet)
    910   17415  140616
```


<span style="font-size: 23px;">**补充**</span>

```
# What is the IP address of the host that asked for the MAC address of 192.168.124.137?
tcpdump -r traffic.pcap arp
```

端口 53 是 **DNS（域名系统）** 使用的端口。DNS 负责将人类可读的域名（例如 `example.com`）转换为计算机可理解的 IP 地址（例如 `192.168.1.1`），使设备能够正确找到目标服务器。

DNS 主要使用两种协议：
- **UDP 端口 53**：用于标准 DNS 查询（速度快，但没有可靠的传输）。
- **TCP 端口 53**：用于较大的 DNS 响应或区域传输（可靠但速度稍慢）。



```bash
# What hostname (subdomain) appears in the first DNS query?
tcpdump -r traffic.pcap port 53 -n
```
### Advanced Filtering

<span style="font-size: 23px;">**Header Bytes**</span>

The purpose of this section is to be able to filter packets based on the contents of a header byte. Consider the following protocols: ARP, Ethernet, ICMP, IP, TCP, and UDP. These are just a few networking protocols we have studied. How can we tell Tcpdump to filter packets based on the contents of protocol header bytes? (We will not go into details about the headers of each protocol as this is beyond the scope of this room; instead, we will focus on TCP flags.)

Using pcap-filter, Tcpdump allows you to refer to the contents of any byte in the header using the following syntax `proto[expr:size]`, where:

- `proto` refers to the protocol. For example, `arp`, `ether`, `icmp`, `ip`, `ip6`, `tcp`, and `udp` refer to ARP, Ethernet, ICMP, IPv4, IPv6, TCP, and UDP respectively.
- `expr` indicates the byte offset, where `0` refers to the first byte.
- `size` indicates the number of bytes that interest us, which can be one, two, or four. It is optional and is one by default.
To better understand this, consider the following two examples from the pcap-filter manual page (and don’t worry if you find them difficult):

- `ether[0] & 1 != 0` takes the first byte in the Ethernet header and the decimal number 1 (i.e., `0000 0001` in binary) and applies the `&` (the And binary operation). It will return true if the result is not equal to the number 0 (i.e., `0000 0000`). The purpose of this filter is to show packets sent to a multicast address. A multicast Ethernet address is a particular address that identifies a group of devices intended to receive the same data.
- `ip[0] & 0xf != 5` takes the first byte in the IP header and compares it with the hexadecimal number F (i.e., `0000 1111` in binary). It will return true if the result is not equal to the (decimal) number 5 (i.e., `0000 0101` in binary). The purpose of this filter is to catch all IP packets with options.

Don’t worry if you find the above two examples complex. We included them so you know what you can achieve with this; however, fully understanding the above examples is not necessary to finish this task. Instead, we will focus on filtering TCP packets based on the set TCP flags.

You can use `tcp[tcpflags]` to refer to the TCP flags field. The following TCP flags are available to compare with:

- `tcp-syn` TCP SYN (Synchronize)
- `tcp-ack` TCP ACK (Acknowledge)
- `tcp-fin` TCP FIN (Finish)
- `tcp-rst` TCP RST (Reset)
- `tcp-push` TCP Push

Based on the above, we can write:

- `tcpdump "tcp[tcpflags] == tcp-syn"` to capture TCP packets with only the SYN (Synchronize) flag set, while all the other flags are unset.
- `tcpdump "tcp[tcpflags] & tcp-syn != 0"` to capture TCP packets with at least the SYN (Synchronize) flag set.
- `tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"` to capture TCP packets with at least the SYN (Synchronize) or ACK (Acknowledge) flags set.

### Displaying Packets

Tcpdump is a rich program with many options to customize how the packets are printed and displayed. We have selected to cover the following five options:

| Command        | Explanation                                    |
|----------------|------------------------------------------------|
| `tcpdump -q`   | Quick and quite: brief packet information      |
| `tcpdump -e`   | Include MAC addresses                          |
| `tcpdump -A`   | Print packets as ASCII encoding                |
| `tcpdump -xx`  | Display packets in hexadecimal format          |
| `tcpdump -X`   | Show packets in both hexadecimal and ASCII     |

---

## nmap

Nmap (Network Mapper) is a open-source tool used for network discovery and security auditing. It also assists in the exploration of network hosts and services, providing information about open ports, operating systems, and other details.

<span style="font-size: 23px;">**主要功能**</span>

1. **端口扫描**：检测目标主机上开放的端口。
2. **服务识别**：识别运行在开放端口上的服务及其版本。
3. **操作系统检测**：推测目标主机的操作系统类型。
4. **网络拓扑发现**：发现网络中的活跃主机和路由信息。
5. **漏洞扫描**：通过脚本检测已知的漏洞。

<span style="font-size: 23px;">**常用命令示例：**</span>

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

### Ping Scanning

Nmap offers the `-sn` option, i.e., ping scan

`nmap -sn` 是 **Nmap（Network Mapper）** 中的一个常用命令，用于执行 **Ping 扫描（主机发现）**，但不会进一步扫描目标主机的端口或服务。**只探测主机是否存活**，与完整的 Nmap 扫描相比，它是一种更快速、侵入性更小的方式来识别哪些 IP 地址正在使用中。

**作用解释:**
1. **主机发现（Host Discovery）**:

- `-sn` 会发送 **ICMP Echo 请求（Ping）**、**TCP SYN 包到端口 443**、**TCP ACK 包到端口 80** 以及 **[ARP](./network.md#arp) 请求（局域网内）**，根据响应判断主机是否在线。

- 如果目标主机屏蔽了 ICMP，Nmap 会通过其他方式（如 TCP 请求）探测。

2. **跳过端口扫描**:

与默认的 Nmap 扫描不同，`-sn` **不会扫描目标主机的开放端口或服务**，仅确认主机是否存活

<span style="font-size: 23px;">**Scanning a “Local” Network**</span>

When scanning a directly connected network, Nmap starts by sending ARP requests. When a device responds to the ARP request, Nmap labels it with “Host is up”.

```bash
root@tryhackme:~# nmap -sn 192.168.66.0/24
Starting Nmap 7.92 ( https://nmap.org ) at 2024-08-07 13:49 EEST
Nmap scan report for XiaoQiang (192.168.66.1)
Host is up (0.0069s latency).
MAC Address: 44:DF:65:D8:FE:6C (Unknown)
Nmap scan report for S190023240007 (192.168.66.88)
Host is up (0.090s latency).
MAC Address: 7C:DF:A1:D3:8C:5C (Espressif)
Nmap scan report for wlan0 (192.168.66.97)
Host is up (0.20s latency).
MAC Address: 10:D5:61:E2:18:E6 (Tuya Smart)
Nmap scan report for 192.168.66.179
Host is up (0.10s latency).
MAC Address: E4:AA:EC:8F:88:C9 (Tianjin Hualai Technology)
[...]
Nmap done: 256 IP addresses (7 hosts up) scanned in 2.64 seconds
```
<span style="font-size: 23px;">**Scanning a “Remote” Network**</span>

```bash
root@tryhackme:~# nmap -sn 192.168.11.0/24
Starting Nmap 7.92 ( https://nmap.org ) at 2024-08-07 14:05 EEST
Nmap scan report for 192.168.11.1
Host is up (0.018s latency).
Nmap scan report for 192.168.11.151
Host is up (0.0013s latency).
Nmap scan report for 192.168.11.152
Host is up (0.13s latency).
Nmap scan report for 192.168.11.154
Host is up (0.22s latency).
Nmap scan report for 192.168.11.155
Host is up (2.3s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 10.67 seconds
```

![nmap-sn](assets/nmap-sn.png)

The Nmap output shows that five hosts are up. But how did Nmap discover this? To learn more, let’s see some sample traffic generated by Nmap. In the screenshot below, we can see the responses from two hosts:

- `192.168.11.1` is live and responded to the ICMP echo (ping) request.
- `192.168.11.2` seems down. Nmap sent two ICMP echo (ping) requests, two ICMP timestamp requests, two TCP packets to port 443 with the SYN flag set, and two TCP packets to port 80 with the ACK flag set. The target didn’t respond to any. We observe several ICMP destination unreachable packets from the `192.168.11.151` router.

### Port Scanning

Earlier, we used `-sn` to discover the live hosts. In this task, we want to discover the network services listening on these live hosts. By network service, we mean any process that is listening for incoming connections on a TCP or UDP port. Common network services include web servers, which usually listen on TCP ports 80 and 443, and DNS servers, which typically listen on UDP (and TCP) port 53.

By design, TCP has 65,535 ports, and the same applies to UDP. How can we determine which ports have a service bound to it? Let’s find out.


---