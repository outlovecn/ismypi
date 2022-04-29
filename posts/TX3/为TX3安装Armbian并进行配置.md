### 安装Armbian (ubuntu focal)

使用 https://github.com/ophub/amlogic-s9xxx-armbian 的镜像，期间有些许问题，在ISSUE获得了ophub的热心帮助

### 修改源为科大源

```shell
sed -i 's/ports.ubuntu.com/mirrors.ustc.edu.cn\/ubuntu-ports/g' /etc/apt/sources.list
sed -i 's/apt.armbian.com/mirrors.ustc.edu.cn\/armbian/g' /etc/apt/sources.list.d/armbian.list

apt update && apt upgrade
```

### 安装ohmyzsh主题Powerlevel10k

> 字体无法下载时，推荐 https://github.com/ryanoasis/nerd-fonts 的字体

1. ```shell
   git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
   ```

2. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`

3. ```shell
   exec zsh
   ```

4. 第3步弹出配置向导，按需配置即可，否则键入 `p10k configure`，使用此命令也可重新配置

### 配置密钥对登录

在Mac终端输入命令，此后可以直接`ssh roo@armbian`登入Armbian

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub root@armbian
```

### 安装一些软件

```shell
apt install nodejs npm neofetch timeshift
```

