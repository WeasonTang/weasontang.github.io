# 📍 书签脚本

<span style="font-size: 23px;">**直接拖到标签栏**</span>

## ⬆️ 回到顶部

```javascript
javascript: void (function () {
  document.scrollingElement.scrollIntoView({ behavior: 'smooth' })
})()
```
<a href="javascript:void(function(){document.scrollingElement.scrollIntoView({behavior:'smooth'})})()">回到顶部</a>

## 👀 显示密码

```javascript
javascript: void (function () {
  document.querySelectorAll('input[type=password]').forEach(function (dom) {
    dom.setAttribute('type', 'text')
  })
})()
```
<a href="javascript:void(function(){document.querySelectorAll('input[type=password]').forEach(function(dom){dom.setAttribute('type','text')})})()">显示密码</a>

## 🔍 解除禁止复制/右键

```javascript
javascript: void (function () {
  document.oncontextmenu = null
  document.onselectstart = null
  document.oncopy = null
  document.oncut = null
  document.onpaste = null
  document.body.style.userSelect = 'auto'
  document.querySelectorAll('*').forEach(function (e) {
    e.style.userSelect = 'auto'
    e.style.webkitUserSelect = 'auto'
    e.oncontextmenu = null
  })
  alert('✅ 已解除限制，可以复制和右键了')
})()
```

<a href="javascript:void(function(){document.oncontextmenu=null;document.onselectstart=null;document.oncopy=null;document.oncut=null;document.onpaste=null;document.body.style.userSelect='auto';document.querySelectorAll('*').forEach(function(e){e.style.userSelect='auto';e.style.webkitUserSelect='auto';e.oncontextmenu=null});alert('✅ 已解除限制')})()">解除复制限制</a>

## 🕵️ 查看所有 Cookie

```javascript
javascript: void (function () {
  alert(document.cookie || '🍪 没有 Cookie')
})()
```
<a href="javascript:void(function(){alert(document.cookie||'🍪 没有 Cookie')})()">查看 Cookie</a>

## 🌐 查看所有 Local Storage

```javascript
javascript: void (function () {
  let r = ''
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    r += k + ' = ' + localStorage.getItem(k) + '\n'
  }
  alert(r || '📦 无 Local Storage 数据')
})()
```

<a href="javascript:void(function(){let r='';for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);r+=k+' = '+localStorage.getItem(k)+'\n'}alert(r||'📦 无 Local Storage 数据')})()">查看 Local Storage</a>

## 🌓 开启暗黑模式（强制）

```javascript
javascript: void (function () {
  const d = document.createElement('style')
  d.textContent =
    'html{filter:invert(1) hue-rotate(180deg)!important;}img,video,canvas,[style*="background-image"]{filter:invert(1)hue-rotate(180deg)!important;}'
  document.head.appendChild(d)
})()
```
<a href="javascript:void(function(){const d=document.createElement('style');d.textContent='html{filter:invert(1) hue-rotate(180deg)!important;}img,video,canvas,[style*=&quot;background-image&quot;]{filter:invert(1)hue-rotate(180deg)!important;}';document.head.appendChild(d)})()">强制暗黑模式</a>
