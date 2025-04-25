# go linux相关操作

## 0.初始化
```bash

go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

```

## 1.更新go版本

```bash
#1.查看go安装位置
echo $GOROOT  /usr/lib/go
#通常是在/usr/local/go/目录下，删除
rm -rf $GOROOT
#2.下载指定版本的go
wget https://studygolang.com/dl/go1.18.4.linux-amd64.tar.gz
#3.解压到usr/local下（官方推荐）
tar -C /usr/lib -zxvf go1.18.4.linux-amd64.tar.gz
#4.修改配置文件（系统配置为/etc/profile，用户配置为~/.profile），这里就修改系统配置在文件最后加上两行（如果有旧版本的go配置就不用加，或者要修改路径）
export GOROOT=/usr/lib/go
export PATH=$PATH:$GOROOT/bin  
#5.执行使配置文件生效
source /etc/profile
#6.查看go版本
go version
#这里有可能不是显示最新版本，很可能是因为旧版本的go可执行文件没有删除，只要用新安装的go可执行文件覆盖掉旧的好了
cp -f $GOROOT/bin/go* /usr/bin/

```

## 2.go项目构建

```bash
#1.项目初始化 （注意：最好全小写）
go mod init github.com/weasontang/hello
#2.1编译
go build .
#2.2 编译成windows可执行文件
GO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .


```

