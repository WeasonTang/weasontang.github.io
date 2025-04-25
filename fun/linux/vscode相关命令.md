# vscode相关命令

## code

```bash
#1.打开 VS Code:
code 
#2.在 VS Code 中打开当前目录:
code .
#3.在 VS Code 打开一个文件或目录:
code {{路径/文件或目录}}
#4.在当前打开的 VS Code 窗口中打开一个文件或目录:
code --reuse-window {{路径/文件或目录}}
#5.在 VS Code 中对比两个文件:
code -d {{文件1}} {{文件2}}
#6.用超级用户 (sudo) 权限打开 VS Code:
sudo code {{路径/文件或目录}} --user-data-dir

```



## windows版常见问题

```bash
# 远程主机ssh密钥改变后 ssh无法连接
del %userprofile%\.ssh\known_hosts
```

