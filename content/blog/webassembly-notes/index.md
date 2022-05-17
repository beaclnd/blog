---
title: 笔记： WebAssembly学习笔记
date: "2022-05-17T12:33:42.231Z"
description:  "WebAssembly学习笔记"
tags: ["笔记", "WebAssembly", "学习"]
---

# WebAssembly笔记
- WebAssembly中支持的数据类型目前只有四种：i32、i64、f32、f64，调用方法传参时如果参数是其他类型，需要在内存中先构建参数然后使用参数指针作为参数。例如字符串参数的每个字符若都作为参数传递，则每个字符需在方法栈中占用4个字节，空间利用率低下，另外参数体积可能不定长，也不利于方法调用。
- WebAssembly内存中总是使用小端模式表示整数/浮点数，无论真实机器是大端还是小端模式。因此若是宿主环境直接从WebAssembly内存中读取整数/浮点数，需要注意根据宿主环境的大小端模式去手动转换数据，因此最好还是通过WebAssembly中的方法返回相应数据。

## 参考链接
1. https://rsms.me/wasm-intro#addressing-memory