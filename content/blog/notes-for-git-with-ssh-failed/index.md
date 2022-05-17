---
title: 笔记： 踩坑——使用git经ssh协议向远程推送或拉取代码库时出错
date: "2022-05-17T11:28:34.778Z"
description:  "基于ssh协议使用git clone或git push命令时，可能出现连接ssh 22端口超时或无访问权限的错误"
tags: ["笔记", "踩坑", "git", "ssh"]
---

### 连接超时
由于某些原因会导致无法通过ssh协议访问远程服务，当基于ssh协议访问远端代码库时会出现连接ssh 22端口超时的问题，此时咱可以修改ssh配置通过https端口来建立ssh连接

如添加及修改配置文件~/.ssh/config： 
```
Host github.com 
    Hostname ssh.github.com
    Port 443
```

### 无访问权限
虽然能与远程服务成功建立ssh连接，但仍会出现访问远程代码库被拒绝的问题，如出现错误：
```
Error: Permission denied (publickey)
```

此时，需要确保在本地生成正确的非对称密钥，并复制其中的公钥配置到远程服务端。

首先生成某种算法的非对称密钥，配置正确的comment，如：
```bash
ssh-keygen -t ed25519 -C "myname@github.com"
```

然后在本地添加该非对称密钥，如：
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_github
```

然后将该非对称密钥中的公钥信息复制配置到远程服务端
```
cat ~/.ssh/id_ed25519_github.pub
```

接着在ssh配置文件中指定使用的私钥，如修改配置文件~/.ssh/config：
```bash
Host github.com 
    Hostname ssh.github.com
    Port 443
    IdentityFile ~/.ssh/id_ed25519_github
```

### 参考链接
1. https://help.github.com/articles/using-ssh-over-the-https-port/
2. https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey
