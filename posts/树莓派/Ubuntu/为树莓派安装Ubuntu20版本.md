---
title: 为树莓派安装Ubuntu20版本
tags:
  - 树莓派
  - raspberrypi
  - Ubuntu
  - ssh
  - mdns
date: 2021-11-19 22:17:53
updated: 2021-11-19 22:17:53
---

树莓派3B因为挂载移动硬盘发生了错误，系统崩了，顺便把原先的raspberry系统换成和ECS上相同的Ubuntu20系统。

首先是查阅文档 :books:

1. [Raspberry Pi Imager](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

----------

### 下载Raspberry Pi Imager

从文档中下载Raspberry Pi Imager，安装Raspberry Pi Imager并打开，选择其他系统>Ubuntu>Ubuntu Server 20版本， 选择SD卡，烧录。静静等待 :tea:

> Raspberry Pi Imager下载稍慢，耐心等一下哦 :sweat_smile:，Raspberry Pi Imager会验证烧录完整性



### 配置Ubuntu Server

#### 修改密码

安装完成后，树莓派通电网口连接路由器，通过路由器管理界面获取ip，ip是192.168.1.3，连接树莓派，默认密码也是ubuntu

```shell
ssh ubuntu@192.168.1.3
```

在看到Changing password for ubuntu后，Current password输入ubuntu回车之后，配置新密码

#### 更换科大源

```shell
sudo sed -i 's/ports.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

#### 启用root账号

```shell
sudo passwd root
```

#### 设置mdns 启用ubuntu.local

```shell
sudo apt install avahi-daemon

sudo apt install avahi-utils
```

> 现在就可以用  `ubuntu.local` 来登录树莓派了

#### Root登录ssh

> 默认是不允许root远程登录的，可以配置文件开启

```shell
sudo vim /etc/ssh/sshd_config
```

找到PermitRootLogin配置项去掉注释，改值为 yes ，重启服务

```shell
sudo systemctl restart sshd
```

接下来用登录root

```shell
ssh root@ubuntu.local
```

