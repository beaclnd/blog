---
title: 笔记： 对数据结构内存对齐的一点总结
date: "2020-05-17T12:13:42.231Z"
description:  "对数据结构内存对齐的一点总结"
tags: ["笔记", "踩坑", "Docker"]
---

## 益处
**数据读取速度：**CPU读取内存数据时，可一次读相应寄存器容量（即word字大小，通常为偶数字节数）的数据量到寄存器里，若指针地址值不是寄存器容量倍数（未对齐地址），也要从更低一点的地址（对齐地址）开始读，若没有对复杂数据对象中的属性数据进行内存对齐，则读取属性数据时可能需要多次读取以及截取合并操作，这会影响程序执行效率。在未对齐情况下，读取单次数据粒度越大，效率将越低。

**节省硬件资源：**当非对齐地址访问数据时，需要额外晶体管来负责处理，将占用宝贵资源。

**数据读取原子性：**内存对齐可以减少跨操作读取单个属性数据的发生，导致数据读取过程被其异常或其他操作指令打断，进而有利于读取数据操作的原子性及程序执行的正确性。

## 参考链接
1. https://cs.stackexchange.com/questions/68660/what-is-the-relation-between-word-size-and-size-of-internal-register-of-a-proces
2. https://developer.ibm.com/articles/pa-dalign
3. https://stackoverflow.com/questions/381244/purpose-of-memory-alignment
4. https://en.wikipedia.org/wiki/Data_structure_alignment
5. https://www.geeksforgeeks.org/data-structure-alignment/