---
title: "Linux Shells"
date: 2025-05
categories:
  - 技术
  - 教程
tags: [Markdown, linux]
description: Linux Shells
draft: false
sidebar: false
outline: deep
---

# Linux Shells

## Introduction

```bash
# To see which shell you are using
echo $SHELL

# list down the available shells in Linux OS
cat /etc/shells

# make this shell as the default shell for your terminal
chsh -s /usr/bin/zsh

# display all your previous commands
history 
```

## Shell Scripting 

### Components

The file must be named with an extension **.sh**.

Every script should start from shebang---**#!/bin/bash**

To give these permissions to the script, we can type the following command in our terminal:

```bash
chmod +x variable_script.sh
```

<span style="font-size: 23px;">**Variables**</span>

variable_script.sh
```sh
# Defining the Interpreter 
#!/bin/bash
echo "Hey, what’s your name?"
read name
echo "Welcome, $name"
```

<span style="font-size: 23px;">**Loops**</span>

loop_script.sh
```sh
# Defining the Interpreter 
#!/bin/bash
for i in {1..10};
do
echo $i
done
```

<span style="font-size: 23px;">**Conditional Statements**</span>

conditional_script.sh
```sh
# Defining the Interpreter 
#!/bin/bash
echo "Please enter your name first:"
read name
if [ "$name" = "Stewart" ]; then
        echo "Welcome Stewart! Here is the secret: THM_Script"
else
        echo "Sorry! You are not authorized to access the secret."
fi
```

**常用命令:** 介绍一些在脚本中常用的 Linux 命令，例如 **if**, **then**, **else**, **for**, **while**, **echo**, **read**, **sed**, **awk**, **grep**, **find** 等。

**脚本调试:** 讲解如何调试脚本，例如使用 **set -x** 开启调试模式。