---
title: 记录玩客云免TTL刷armbian的成功经验
tags:
  - 玩客云
  - armbian
date: 2021-11-24
updated: 2021-11-24
---

之前在闲:fish:上买过的玩客云闲置很久，给树莓派整差不多了之后，准备把玩客云刷机。

查询文档，下载了多个镜像和刷机文档。

大抵是因为笔记本没有USB3接口的缘故，刷机完成后总不能启动折腾了几天，终于是完成。特此记录下流程。

----------

#### 下载资源

https://e.coding.net/outlove/wky/armbian.git

#### 刷机步骤

刷机需要Windows系统，Mac使用虚拟机未成功。

准备：公对公usb数据线，U盘一个，下载资源。

1. 安装USB_Burning_Tool_烧录软件。
2. 打开安装好的USB_Burning_Tool.exe，选择文件-导入烧录包-底包.img，点击开始。
3. 使用公对公USB线连接玩客云靠近HDMI接口的USB口和电脑。
4. 短接刷机触点，插入玩客云电源。（已经短接线刷过的，按住reset即可）
5. 烧录完成后拔掉电源和公对公USB线。
6. 把U盘插到电脑上，把映像文件Armbian_5.88内置emmc需要U盘刷.img 写入U盘。
7. 将制作好的U盘插入玩客云靠近网口的USB口，插入玩客云电源，指示灯会先亮绿灯，再亮蓝灯，再红蓝闪烁，等蓝灯常亮后，拔掉U盘、电源。
8. 插入玩客云网线、电源，登录自己的路由器，查看玩客云的IP地址。
10. 用SSH工具登录进行其他设置。用户root， 密码1234

#### 一些设置

登录之后`apt update` 会报错，需要更新源

apt科大源

```
mv /etc/apt/sources.list /etc/apt/sources.list.bak
vim /etc/apt/sources.list

deb http://mirrors.ustc.edu.cn/debian stretch main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stretch-updates main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stretch-backports main contrib non-free
deb http://mirrors.ustc.edu.cn/debian-security stretch/updates main contrib non-free
```

kubeadm源

```
apt-get update && apt-get install -y apt-transport-https
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
apt-get update
```

经测试  `apt upgrade`和`apt dist-upgrade`  均成功

