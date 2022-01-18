---
title: 笔记： 踩坑——Docker使用错误及经验总结
date: "2021-10-17T22:48:42.231Z"
description:  "对自己在使用Docker时遇到的错误及经验进行梳理与总结"
tags: ["笔记", "踩坑", "Docker"]
---

### host网络模式
运行Docker容器时，可使用参数`--network host`来使得可从容器内通过`localhost:<port>`来访问宿主机中运行的其他服务，容器和宿主机将共享网络空间，也无需端口映射配置。

此外，使用host模式在容器内使用localhost或127.0.0.1访问宿主机服务只在Linux中有效。

Mac或Windows中的Docker Desktop现不支持localhost访问宿主机，但18.08+版本可支持使用host.docker.internal访问宿主机。

### docker虚拟网卡默认ip
在默认配置下，启动docker daemon服务将会生成虚拟网卡docker0，并自动设置其ip为172.17.0.1/16，且自动在操作系统路由表中添加记录项以将所有目标地址与网段172.17.0.0/16相匹配的请求路由到docker0网卡。若宿主机对外使用的ip(如172.17.23.89)恰好能匹配该网段，则会导致后续外部远程连接该宿主机失败。

同样地，默认情况下使用docker-compose启动容器时，docker-compose.yml中的容器网络配置若是bridge网络驱动(默认配置)，则会产生名为br-xxxxx的虚拟网卡，并自动设置其ip为172.18.0.1/16，其自动在操作系统路由表中添加记录项以将所有目标地址与网段172.18.0.0/16相匹配的请求路由到br-xxxxx网卡。若宿主机对外使用的ip(如172.18.86.22)恰好能匹配该网段，则会导致远程连接该宿主机失败。

可以通过修改docker配置文件：`/etc/docker/daemon.json`，同时更改上述docker0及br-xxxx虚拟网卡的默认ip及路由表中匹配的网段地址以避免与宿主机ip冲突。如下所示，在该配置文件中使用配置：

```
{
    "default-address-pools": [
        {
            "base": "172.31.0.0/16",
            "size": 24
        }
    ]
}
```

使用上述配置后，启动或重启docker daemon服务。则docker0网卡和br-xxxx网卡会被分别分配ip：

```
docker0: 172.31.0.1/24
br-xxxx: 172.31.1.1/24
```

路由表中的记录项所匹配的网段将分别为：
```
172.31.0.0/24: docker0
172.31.1.0/24: br-xxxx
```