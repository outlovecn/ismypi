---
title: 为树莓派配置通配符SSL证书并转发所有HTTP请求到HTTPS
tags:
  - 树莓派
  - raspberrypi
  - SSL
  - HTTPS
  - nginx
  - DNSPod
date: 2021-11-16 14:24:29
updated: 2021-11-16 14:24:29
---

书接上文，树莓派使用IPv6获得外网访问能力，但是谷歌浏览器地址栏左侧，**不安全 **三个字很扎眼

今天的主题是，解决树莓派的SSL证书，并且把所有的http请求转发到https

- - -

### 1.使用acme.sh让树莓派获得通配符证书

域名`onlypic.cc` 使用了 **cloudflare** 作为DNS服务器，而cloudflare也提供了ssl服务，经过测试体验也不错，缺点是不能白嫖通配符的HTTPS。

那么只能请出今天的主角：大名鼎鼎的 *acme.sh*

连接树莓派，这里安利一下Mac上的**Termius**，连接远程服务器也很稳定

#### 安装acme.sh

由于不可控的原因，github连接不稳定，所以这里使用了我的备份库

```shell
git clone https://e.coding.net/outlove/github/acme.sh.git
cd ./acme.sh
./acme.sh --install -m my@onlypic.cc
```

安装完成后，断开树莓派重新连接，查询版本号验证安装

```shell
 acme.sh -v	
```

#### 配置acme.sh的DNS API

> https://outlove.coding.net/s/b070e3c4-289d-4f7e-846d-1b514227117c

Cloudflare配置 **API 令牌** 和 **帐户ID**

为了这个区分之前的 `onlypic.cc` 配置的证书， 我买了一个新的域名 `ismypi.cn`，配置的DNS API令牌需要包含这个域名

```shell
export CF_Token="qq-c1DxdtNxvSQk1pFIbsBwvhTN5EGEhsrK5jxmt"
export CF_Account_ID="5df93d9981b07f61e890eb5eb6328d88"
```

#### 获取并且安装证书

好的！现在为新域名获取**通配符证书 :running:**

```shell
acme.sh --issue --dns dns_cf -d ismypi.cn -d '*.ismypi.cn'
```

两分钟之后，Cert success.

接下进行安装，我配置的目录是 `/home/pi/ssl/`，这里安装完成之后需要手动配置到Nginx才能生效哦 :smiley_cat:

```shell
acme.sh --install-cert -d ismypi.cn \
--key-file       /home/pi/ssl/key  \
--fullchain-file /home/pi/ssl/cert
```

### 2. 配置证书到Nginx

配置证书，并转发所有http请求到https

```nginx
# 转发所有http请求到https
server {
  listen 80;
  listen [::]:80;
  return 301 https://$server_name$request_uri;
}

server {
  listen 80;
  listen [::]:80;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ~^(?<subdomain>.+).ismypi.cn;

  if ($server_port = 80 ) {
    return 301 https://$server_name$request_uri; 
  }

  # ssl cert
  ssl_certificate /home/pi/ssl/cert;
  ssl_certificate_key /home/pi/ssl/key;

  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;

  charset utf-8;
  set $dir $subdomain;
  if ( $dir = '' ) {
    set $dir 'www';
  }

  index index.html index.htm;

  location / {
    root /home/pi/www/$dir;
    try_files $uri $uri/;
  }
  location /favicon.ico {
    log_not_found off;
    access_log off;
    root /home/pi/www/favicon;
  }
}
```





**项目地址：http://onlypic.cc**

