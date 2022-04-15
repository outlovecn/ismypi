## 清理 docker 和 k8s

```shell
apt autoremove docker docker-ce docker-engine  docker.io  containerd runc
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
apt autoremove docker-ce-*
rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker

kubeadm reset -f
modprobe -r ipip
lsmod
apt autoremove kube*
rm -rf ~/.kube/
rm -rf /etc/kubernetes/
rm -rf /etc/systemd/system/kubelet.service.d
rm -rf /etc/systemd/system/kubelet.service
rm -rf /usr/bin/kube*
rm -rf /etc/cni
rm -rf /opt/cni
rm -rf /var/lib/etcd
rm -rf /var/etcd

```

## apt 源

```
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian-security buster/updates main
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib

deb-src http://mirrors.aliyun.com/debian-security buster/updates main
deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
```

## armbian 源

```
deb http://mirrors.aliyun.com/armbian/ buster main buster-utils buster-desktop
```

## armbian-config

换源之后 apt update 也会出错，使用 armbian-config 更新系统

```shell
armbian-config
```

## Oh my zsh

```shell
apt install zsh
git clone https://e.coding.net/outlove/github/ohmyzsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
chsh -s /bin/zsh

git clone https://e.coding.net/outlove/github/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```

`vim .zshrc` 激活插件

```
plugins=(
git
z
zsh-syntax-highlighting
)
```

后执行 `source ~/.zshrc`

## 挂载硬盘

```
mkdir /root/others /root/timemachine /root/sda

lsblk
blkid /dev/sda1

vim /etc/fstab
```

```
UUID="58c8180b-cd56-4fc2-a87f-a47922c55b0a" /root/others ext4 defaults 0 0
UUID="2a0c9bc5-43ef-4a7b-837b-d8f9471bf4be" /root/timemachine ext4 defaults 0 0
UUID="7cf9605e-a0d9-4542-8a24-a3b1bee4d489" /root/sda ext4 defaults 0 0
```

```
mount -a
```

## timeshift 系统备份恢复

```shell
apt install timeshift
vim /etc/timeshift/timeshift.json
```

backup_device_uuid 使用上文挂载 timemachine 的分区 id，会自动创建 timeshift 目录
故系统会备份在/root/timemachine/timeshift 目录下
完整配置参考：
{
"backup_device_uuid" : "2a0c9bc5-43ef-4a7b-837b-d8f9471bf4be",
"parent_device_uuid" : "",
"do_first_run" : "false",
"btrfs_mode" : "false",
"include_btrfs_home" : "false",
"stop_cron_emails" : "true",
"schedule_monthly" : "true",
"schedule_weekly" : "true",
"schedule_daily" : "true",
"schedule_hourly" : "false",
"schedule_boot" : "true",
"count_monthly" : "2",
"count_weekly" : "3",
"count_daily" : "3",
"count_hourly" : "3",
"count_boot" : "3",
"snapshot_size" : "0",
"snapshot_count" : "0",
"exclude" : [
"+ /root/.**"
],
"exclude-apps" : [
]
}

配置完成后启动命令行模式

```shell
timeshift --scripted
```

主动备份：

```shell
timeshift --create --comments 'init!'
```

查看备份：:joy: 可以看到已经有两次备份

```shell
timeshift --list
// 无视这个报错
E: Error opening directory '/dev/mapper': No such file or directory
Device : /dev/sda3
UUID   : 2a0c9bc5-43ef-4a7b-837b-d8f9471bf4be
Path   : /root/timemachine
Mode   : RSYNC
Device is OK
2 snapshots, 273.4 GB free

Num     Name                 Tags     Description
------------------------------------------------------------------------------
0    >  2022-03-08_20-00-02  B D W M
1    >  2022-03-08_20-12-27  O        init!
```

删除备份：

```shell
timeshift --delete  --snapshot '2022-03-08_20-12-27'
```

恢复备份：

```shell
timeshift --restore
```

## SSH 中文乱码处理

在 /etc/environment 修改、新增这两行

LC_ALL="en_US.UTF-8"
LANG="en_US.UTF-8"

然后执行 `source /etc/environment`
