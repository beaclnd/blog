---
title: 笔记： 踩坑——Docker基于URL进行Build时出错
date: "2020-12-01T08:51:42.231Z"
description:  "Docker基于远程Git URL进行镜像Build时，遇到错误信息： error initializing submodules: usage: git submodule"
tags: ["笔记", "踩坑", "Docker"]
---

### 环境

    - OS: Centos 7.9.2009
    - Docker: 19.03.13
    - docker-compose: 1.27.4

### 问题描述
使用docker-compose运行容器，在此过程中需要向远程代码库获取源码以Build镜像，结果输出错误信息：
```bash
error initializing submodules: usage: git submodule [--quiet] add [-b <branch>] [-f|--force] [--name <name>] [--reference <repository>] [--] <repository> [<path>]
   or: git submodule [--quiet] status [--cached] [--recursive] [--] [<path>...]
   or: git submodule [--quiet] init [--] [<path>...]
   or: git submodule [--quiet] deinit [-f|--force] [--] <path>...
   or: git submodule [--quiet] update [--init] [--remote] [-N|--no-fetch] [-f|--force] [--rebase] [--reference <repository>] [--merge] [--recursive] [--] [<path>...]
   or: git submodule [--quiet] summary [--cached|--files] [--summary-limit <n>] [commit] [--] [<path>...]
   or: git submodule [--quiet] foreach [--recursive] <command>
   or: git submodule [--quiet] sync [--recursive] [--] [<path>...]
: exit status 1
```

### 解决方法
经过一番google后，发现是由于使用的Docker版本与Git版本不匹配导致的。

因为Docker 19在运行`git clone`之后还会运行命令`git submodule update --init --recursive --depth=1`, 若Git版本低于2.10则无法识别参数`--depth`，CentOS 7.9默认能安装的Git版本为1.8，故出现了上述错误。

解决方法可以是：

    - 降低Docker的版本
    - 升级Git的版本

我选择了升级Git的版本，首先卸载老版本Git，然后为CentOS 7.9添加Endpoint仓库，接着安装新版本Git:
```bash
$ yum remove git*
$ yum -y install https://packages.endpoint.com/rhel/7/os/x86_64/endpoint-repo-1.7-1.x86_64.rpm
$ yum install -y git
$ git --version
git version 2.24.1
```

最终问题得以解决。

### 参考
1. https://forums.docker.com/t/build-with-url-error/48638
2. https://computingforgeeks.com/how-to-install-latest-version-of-git-git-2-x-on-centos-7

