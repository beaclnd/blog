---
title: "为网站申请免费TLS/SSL证书"
date: "2021-07-11T08:51:42.231Z"
description:  "全面拥抱HTTPS的时代，没有个TLS/SSL证书还怎么愉快玩耍？Let's Encrypt为我们提供了免费的证书申请/撤销等管理服务及工具，简直不要太便利"
tags: ["Certificate", "TLS/SSL"]
---

[Let's Encrypt](https://letsencrypt.org)是免费、开放和自动化的证书颁发机构，由非盈利组织互联网安全研究小组（ISRG）负责运营。Let's Encrypt基于[ACME协议](https://tools.ietf.org/html/rfc8555)，它自己维护了证书颁发机构服务，并为我们提供了证书管理软件(ACME 客户端)，能够自动化申请域名证书，其[工作原理](https://letsencrypt.org/zh-cn/how-it-works/)主要分为2步:
-  使用证书管理软件向证书颁发机构证明服务器对域名的拥有权
-  使用证书管理软件向证书颁发机构申请、续期或撤销域名证书

在这里，我已经在阿里云上建立了一个云服务器（Ubuntu 16.04.3 LTS x86_64 + Nginx ）并绑定了域名，下面记录一下我为该域名申请免费证书的过程。

### 安装证书管理软

简单起见，我使用了[Snap](https://Snapcraft.io/docs/getting-started)来安装证书管理软件，Snap是Ubuntu的母公司Canonical推出的应用打包、安装及管理方案，可以跨各种Linux发现版本，咱也不用管各种依赖问题。

我的Ubuntu版本未自带Snapd服务，因此需要先安装Snapd：
```bash
$ apt install snapd
$ PATH=$PATH:/snap/bin
```

然后安装证书管理软件certbot：
```bash
$ snap install --classic certbot
```

### 申请证书
运行certbot申请证书并自动修改Nginx配置：
```bash
$ certbot --nginx
```

> nginx配置文件中的相应Server块需要指定对应的服务域名，如`server_name abc.cn`否则certbot在申请完证书后无法自动更新nginx配置; 

然后：
- 输入邮箱信息
- 输入域名

> certbot将自动修改Nginx的配置，包括80端口跳转及证书、私钥路径等，若想自己手动修改Nginx配置，可以运行:
> `$ certbot certonly --nginx`

> 默认已经开启自动更新证书，可以运行下列命令测试是否开启正常:
> `$ certbot renew --dry-run`

重启一下Nginx, 然后就可以通过HTTPS正常访问网站了:) 

### 参考链接
1. https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx