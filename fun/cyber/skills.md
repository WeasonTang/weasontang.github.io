---
title: "skills"
categories:
  - 技术
  - 教程
tags: [Markdown, web]
draft: true
sidebar: false
outline: deep
---

# skills

## Search Skills


Every one of us has used an Internet search engine; however, not everyone has tried to harness the full power of an Internet search engine. Almost every Internet search engine allows you to carry out advanced searches. Consider the following examples:

- [Google](https://www.google.com/advanced_search)
- [Bing](https://support.microsoft.com/en-us/topic/advanced-search-options-b92e25f1-0085-4271-bdf9-14aaea720930)
- [DuckDuckGo](https://duckduckgo.com/duckduckgo-help-pages/results/syntax)

Let’s consider the search operators supported by Google.

- **"exact phrase"**: Double quotes indicate that you are looking for pages with the exact word or phrase. For example, one might search for **"passive reconnaissance"** to get pages with this exact phrase.
- **site:**: This operator lets you specify the domain name to which you want to limit your search. For example, we can search for success stories on TryHackMe using **site:tryhackme.com success stories**.
- **-**: The minus sign allows you to omit search results that contain a particular word or phrase. For example, you might be interested in learning about the pyramids, but you don’t want to view tourism websites; one approach is to search for **pyramids -tourism or -tourism pyramids**.
- **filetype:**: This search operator is indispensable for finding files instead of web pages. Some of the file types you can search for using Google are Portable Document Format (PDF), Microsoft Word Document (DOC), Microsoft Excel Spreadsheet (XLS), and Microsoft PowerPoint Presentation (PPT). For example, to find cyber security presentations, try searching for **filetype:ppt cyber security**.

You can check more advanced controls in various search engines in this advanced search operators list; however, the above provides a good starting point. Check your favourite search engine for the supported search operators.

### Specialized Search Engines

<span style="font-size: 23px;">**Shodon**</span>

[Shodan](https://www.shodan.io/) is a search engine for devices connected to the Internet. It allows you to search for specific types and versions of servers, networking equipment, industrial control systems, and IoT devices. You may want to see how many servers are still running Apache 2.4.1 and the distribution across countries. To find the answer, we can search for **apache 2.4.1**, which will return the list of servers with the string “apache 2.4.1” in their headers.

Consider visiting Shodan [Search Query Examples](https://www.shodan.io/search/examples) for more examples. Furthermore, you can check [Shodan trends](https://trends.shodan.io/) for historical insights if you have a subscription.

<span style="font-size: 23px;">**Censys**</span>

At first glance, [Censys](https://search.censys.io/) appears similar to Shodan. However, Shodan focuses on Internet-connected devices and systems, such as servers, routers, webcams, and IoT devices. Censys, on the other hand, focuses on Internet-connected hosts, websites, certificates, and other Internet assets. Some of its use cases include enumerating domains in use, auditing open ports and services, and discovering rogue assets within a network. You might want to check [Censys Search Use Cases](https://support.censys.io/hc/en-us/articles/20720064229140-Censys-Search-Use-Cases).

#### VirusTotal

[VirusTotal](https://www.virustotal.com/gui/home/upload) is an online website that provides a virus-scanning service for files using multiple antivirus engines. It allows users to upload files or provide URLs to scan them against numerous antivirus engines and website scanners in a single operation. They can even input file hashes to check the results of previously uploaded files.


#### Have I Been Pwned

[Have I Been Pwned](https://haveibeenpwned.com/) (HIBP) does one thing; it tells you if an email address has appeared in a leaked data breach. Finding one’s email within leaked data indicates leaked private information and, more importantly, passwords. Many users use the same password across multiple platforms, if one platform is breached, their password on other platforms is also exposed. Indeed, passwords are usually stored in encrypted format; however, many passwords are not that complex and can be recovered using a variety of attacks.

### Vulnerabilities and Exploits

#### CVE

- Common Vulnerabilities and Exposures (CVE), this term is given to a publicly disclosed vulnerability

We can think of the Common Vulnerabilities and Exposures (CVE) program as a dictionary of vulnerabilities. It provides a standardized identifier for vulnerabilities and security issues in software and hardware products. Each vulnerability is assigned a CVE ID with a standardized format like **CVE-2024-29988**. This unique identifier (CVE ID) ensures that everyone from security researchers to vendors and IT professionals is referring to the same vulnerability, [CVE-2024-29988](https://nvd.nist.gov/vuln/detail/CVE-2024-29988) in this case.

The MITRE Corporation maintains the CVE system. For more information and to search for existing CVEs, visit the [CVE Program](https://www.cve.org/) website. Alternatively, visit the [National Vulnerability Database](https://nvd.nist.gov/) (NVD) website. The screenshot below shows CVE-2014-0160, also known as Heartbleed.

#### Exploit Database

There are many reasons why you would want to exploit a vulnerable application; one would be assessing a company’s security as part of its red team. Needless to say, we should not try to exploit a vulnerable system unless we are given permission, usually via a legally binding agreement.

Now that we have permission to exploit a vulnerable system, we might need to find a working exploit code. One resource is the [Exploit Database](https://www.exploit-db.com/). The Exploit Database lists exploit codes from various authors; some of these exploit codes are tested and marked as verified.

[GitHub](https://github.com/), a web-based platform for software development, can contain many tools related to CVEs, along with proof-of-concept (PoC) and exploit codes. To demonstrate this idea, check the screenshot below of search results on GitHub that are related to the Heartbleed vulnerability.

### Technical Documentation

[Microsoft Windows](https://learn.microsoft.com) 

[Snort Official](https://www.snort.org/documents)

[Apache HTTP Server](https://httpd.apache.org/docs)

[Node.js](https://nodejs.org/docs/latest/api)