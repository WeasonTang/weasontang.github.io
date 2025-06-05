---
title: "Bookmarklet"
categories:
  - 技术
  - 教程
tags: [Bookmarklet, 书签脚本]
sidebar: false
outline: 2
---

# 书签脚本

## 回到顶部

```javascript
javascript: void (function () {
  document.scrollingElement.scrollIntoView({ behavior: 'smooth' })
})()
```
<a href="javascript:void(function(){document.scrollingElement.scrollIntoView({behavior:'smooth'})})()">回到顶部</a>


## 显示密码

```javascript
javascript: void (function () {
  document.querySelectorAll('input[type=password]').forEach(function (dom) {
    dom.setAttribute('type', 'text')
  })
})()
```
<a href="javascript:void(function(){document.querySelectorAll('input[type=password]').forEach(function(dom){dom.setAttribute('type','text')})})()">显示密码</a>
