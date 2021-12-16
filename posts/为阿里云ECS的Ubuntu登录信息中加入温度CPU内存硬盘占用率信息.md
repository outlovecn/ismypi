---
title: 为阿里云ECS的Ubuntu登录信息中加入温度CPU内存硬盘占用率信息
tags:
  - 阿里云
  - Ubuntu
  - ssh
date: 2021-11-20 11:46:00
updated: 2021-11-20 11:46:00
---

近日在玩树莓派时发现了有趣的玩意: 在树莓派登录信息中加入温度 CPU、内存硬盘占用率信息

拿来主义！

把这个用到阿里云ECS上试一试效果！

----------

文档：

1. [在树莓派登录信息中加入温度 CPU、内存硬盘占用率信息](https://shumeipai.nxez.com/2021/08/25/add-memory-and-disk-occupancy-info-to-login-info.html)

首先ssh登录ECS， 看一下最初的登录信息

```shell
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-89-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

Welcome to Alibaba Cloud Elastic Compute Service !

Last login: Fri Nov 19 22:11:06 2021 from 112.32.9.41
```

准备把中间的帮助信息替换掉

```shell
vim /etc/update-motd.d/10-help-text
```

注释掉三行帮助信息，然后加入下面的文本

```bash
uptime | awk '{printf("\nCPU Load: %.2f\t", $(NF-2))}'
free -m | awk 'NR==2{printf("Mem: %s/%sMB %.2f%%\n", $3,$2,$3*100/$2)}'
cat /sys/class/thermal/thermal_zone0/temp|awk '{printf("CPU Temp: %.2f\t",$1/1000)}'
df -h | awk '$NF=="/"{printf "Disk: %.1f/%.1fGB %s\n\n", $3,$2,$5}'

```

重新ssh登录

```
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-89-generic x86_64)


CPU Load: 0.00  Mem: 287/1987MB 14.44%
Disk: 8.1/40.0GB 22%


Welcome to Alibaba Cloud Elastic Compute Service !

Last login: Sat Nov 20 11:38:54 2021 from 112.32.9.41
```

Emmm，就先这样吧