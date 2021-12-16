---
title: 为树莓派的Ubuntu安装nginx并把阿里云ECS上的项目同步到树莓派
tags:
  - 树莓派
  - raspberrypi
  - Ubuntu
  - nginx
date: 2021-11-20 14:36:25
updated: 2021-11-20 14:36:25
---

阿里云ECS上用的也是Ubuntu20版本，那么把ECS上的项目能不能平滑迁移到树莓派上呢？

试一试把。

首先，登录树莓派。

----------

#### 安装nginx

```
apt install -y nginx
```

查看状态 `systemctl status nginx ` ，会发现nginx已经在运行了

查看 http://ubuntu.local/ 会看到大大的：Welcome to nginx!

#### 安装Docker

> https://docs.docker.com/engine/install/ubuntu/

```shell
apt update

apt install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
apt update

apt install docker-ce docker-ce-cli containerd.io
```

#### 复制ECS上的文件到树莓派

```
scp -r root@outlove.cn:/root/home/ root@ubuntu.local:/root/home/
```

#### DDOS 和 HTTPS

参照之前的博客，配置动态解析和SSL证书

1. 树莓派自动更新动态的IPv6地址到域名解析
2. 为树莓派配置通配符SSL证书并转发所有HTTP请求到HTTPS



**项目地址：https://ismypi.cn**