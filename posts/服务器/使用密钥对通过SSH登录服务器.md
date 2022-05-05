ssh 登录服务器时输入 ssh yourname@hostname，服务器会要求输入密码，
使用密钥对登录可以省去这一步骤，便捷而安全

### 第一步生成密钥对，本机已有密钥对可跳过

> \~/.ssh/id_rsa.pub 为 Mac 和 Linux 密钥对目录，Windows 目录在 C 盘>用户目录>.ssh 内, 文中目录地址在 Windows 系统中需替换为对应目录

检查本地是否有密钥，使用下面命令检查发现本地已有密钥，直接进行第二步

```bash
cat ~/.ssh/id_rsa.pub
```

未输出公钥，则需要生成密钥对,可输入邮箱

```bash
ssh-keygen -t rsa -b 4096 -C "yourname or youremail"
```

### 第二步发送到服务器

使用 ssh-copy-id 命令发送到服务器

```
ssh-copy-id -i ~/.ssh/id_rsa.pub yourname@hostname
```

完成时会提示 Number of key(s) added: 1

此时用 ssh yourname@hostname 即可登录服务器
