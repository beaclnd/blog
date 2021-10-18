---
title: 笔记： 踩坑——Docker使用错误及经验总结
date: "2021-10-17T22:48:42.231Z"
description:  "对自己在使用Docker时遇到的错误及经验进行梳理与总结"
tags: ["笔记", "踩坑", "Docker"]
---

### host模式的坑
运行Docker容器时，可使用参数`--network host`来使得可从容器内通过`localhost:<port>`来访问宿主机中运行的其他服务，但需要考虑运行环境与该操作有冲突，比如在某些严格访问的服务器环境中，使用host模式可能会与其网络设置冲突，导致后续远程连接被拒绝。虽然可以依靠人工恢复网络连接，但若这种情况下，欲访问的其他服务也运行于Docker容器中，最好将容器内的`localhost`访问改成容器间可寻址的网络主机名称。

此外，使用host模式在容器内使用localhost或127.0.0.1访问宿主机服务只在Linux中有效。

Mac或Windows中的Docker Desktop现不支持localhost访问宿主机，但18.08+版本可支持使用host.docker.internal访问宿主机。