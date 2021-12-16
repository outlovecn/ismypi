---
title: 为树莓派的Ubuntu安装ohmyzsh
tags:
  - 树莓派
  - raspberrypi
  - Ubuntu
date: 2021-11-20 14:31:25
updated: 2021-11-20 14:31:25
---

Ubuntu没有内置 `zsh` 首先安装

```bash
apt install zsh
```

安装oh-my-zsh，这里使用我的coding同步库

----------

```shell
git clone https://e.coding.net/outlove/github/ohmyzsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
chsh -s /bin/zsh
```

重新ssh登录， 可以看到ohmyzsh生效了：

> 升级命令是 `omz update`， 执行后会从我的coding库里检测并拉取新版本

```shell
➜ ~ omz update
Updating Oh My Zsh
From https://e.coding.net/outlove/github/ohmyzsh
 * branch              master     -> FETCH_HEAD
Current branch master is up to date.
         __                                     __   
  ____  / /_     ____ ___  __  __   ____  _____/ /_  
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \ 
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / / 
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/  
                        /____/                       

Oh My Zsh is already at the latest version.
```

配置一下主题， 在.zshrc里， 把ZSH_THEME改为ys

```shell
vim ~/.zshrc
```

执行 `source ~/.zshrc` 后终端显示：

```shell
# root @ ubuntu in ~
```

安装zsh-syntax-highlighting、zsh-autosuggestions

```shell
git clone https://e.coding.net/outlove/github/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://e.coding.net/outlove/github/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

在 `.zshrc` 激活插件，后执行  `source ~/.zshrc`

```
plugins=(
git
z
zsh-syntax-highlighting
zsh-autosuggestions
)
```

