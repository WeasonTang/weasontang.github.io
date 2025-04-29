---
title: "web"
date: 2025-04
quote: tryhackme
categories:
  - 技术
  - 教程
tags: [Markdown, web]
description: How The Web Works
draft: false
---

# web

To become a better hacker it's vital to understand the underlying functions of the world wide web and what makes it work.

## DNS in Detail

Learn how DNS works and how it helps you access internet services.

### What is DNS?

> DNS (Domain Name System) provides a simple way for us to communicate with devices on the internet without remembering complex numbers. Much like every house has a unique address for sending mail directly to it, every computer on the internet has its own unique address to communicate with it called an IP address. An IP address looks like the following 104.26.10.229, 4 sets of digits ranging from 0 - 255 separated by a period. When you want to visit a website, it's not exactly convenient to remember this complicated set of numbers, and that's where DNS can help. So instead of remembering 104.26.10.229, you can remember tryhackme.com instead.

### Domain Hierarchy

域名层次结构指的是在域名系统（DNS）中域名的组织方式，它分为三个主要层级：

1. **顶级域名（TLD）**：
   - 这是域名最右边的部分，例如 `.com`、`.org` 或 `.gov`。
   - 顶级域名分为两种类型：**通用顶级域名（gTLD）** 和 **国家代码顶级域名（ccTLD）**。 
   - gTLD 历史上表示域名的用途，例如 `.com` 代表商业用途，`.org` 代表组织机构，`.edu` 代表教育机构，`.gov` 代表政府部门。现在，有许多新的 gTLD，例如 `.online` 和 `.biz`。
   - ccTLD 表示特定的地理区域，例如 `.ca` 代表加拿大，`.co.uk` 代表英国。

2. **二级域名**：
   - 它位于顶级域名前面，例如在 `tryhackme.com` 中，`tryhackme` 是二级域名。二级域名在注册时通常受到字符和长度限制。

3. **子域名**：
   - 子域名位于二级域名前面，通过点号分隔，例如在 `admin.tryhackme.com` 中，`admin` 是子域名。
   - 子域名可以有多个层次，例如 `jupiter.servers.tryhackme.com`。

这一层次结构确保了互联网中网站的有序管理和访问。