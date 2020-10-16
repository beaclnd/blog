---
title: 不同公钥算法所生成证书建立TLS连接时的表现
date: "2020-03-12T12:40:32.169Z"
description: 本试验主要是基于RSA与EC算法生成公钥证书，并结合该证书与NodeJS建立HTTPS/TLS服务，然后使用客户端连接该服务，并记录TLS连接建立的结果
tags: ["实验", "tls", "加密", "公钥加密"]
---

本试验主要是基于RSA与EC算法生成公钥证书，并结合该证书与NodeJS建立HTTPS/TLS服务，然后使用客户端连接该服务，并记录TLS连接建立的结果。
> Note: 试验相关程序代码见 https://gitee.com/JayTsang/myblog-tls-with-various-publickey-algorithms.git 

其中针对EC算法主要测试了Openssl(v1.1.1c)所支持的包括secp256k1,secp256r1/prime256v1,curve25519,curve448在内的各种曲线(使用命令`openssl ecparam --list_curves`可查看所有曲线名)。

> Note: MacOS下，首先需要确认**openssl**的版本，command： `openssl version`，如果出现**LibreSSL**，需要首先安装**openssl**，并修改默认链接，或者将代码中相关**openssl**修改为**openssl**的绝对路径。

试验中的服务端基于NodeJS编写，使用NodeJS自带的TLS库。

试验中的客户端主要包括：
- NodeJS编写的客户端程序(自动连接服务端), 使用NodeJS自带的TLS库(v10.16.3)；
- 主流浏览器(手动连接服务端)：
  + Chrome: 80.0.3987.132（正式版本）（64 位）
  + Firefox: 68.0.1 (64-bit)
  + Edge: 42.17134.1.0
  + Safari: 13.0.5 (13608.5.12)
  + IE: 11.648.17134.0 

## 试验流程
首先，使用NodeJS客户端与TLS服务端进行连接，并获得使用每种公钥算法时的连接结果，从中挑出连接结果为成功的公钥算法。

然后针对上述连接成功的公钥算法，使用浏览器作为客户端与TLS服务端进行连接，再记录连接结果。

使用上述方法流程，最终找出在建立TLS会话时，NodeJS客户端与浏览器都支持的用于生成身份公钥证书的公钥算法。

### 安装依赖
```bash
yarn install
```
### NodeJS客户端连接TLS服务
```bash
yarn start:batch
```
上述命令将自动基于RSA及EC的若干曲线算法生成相应的自签名公钥证书，构建TLS服务，并使客户端程序自动连接该TLS服务，最后输出连接结果统计情况。

统计结果如下：

|algorithm|algParam|status|reason|
|----|----|----|----|
|RSA|1024|Success||
|RSA|2048|Success||
|RSA|4096|Success||
|EC|secp112r1|Failed|key too small|
|EC|secp112r2|Failed|key too small|
|EC|secp128r1|Failed|key too small|
|EC|secp128r2|Failed|key too small|
|EC|secp160k1|Failed|no shared cipher|
|EC|secp160r1|Failed|no shared cipher|
|EC|secp160r2|Failed|no shared cipher|
|EC|secp192k1|Failed|no shared cipher|
|EC|secp224k1|Failed|no shared cipher|
|EC|secp224r1|Failed|no shared cipher|
|EC|secp256k1|Failed|no shared cipher|
|EC|secp384r1|Success||
|EC|secp521r1|Success||
|EC|prime192v1|Failed|no shared cipher|
|EC|prime192v2|Failed|no shared cipher|
|EC|prime192v3|Failed|no shared cipher|
|EC|prime239v1|Failed|no shared cipher|
|EC|prime239v2|Failed|no shared cipher|
|EC|prime239v3|Failed|no shared cipher|
|EC|prime256v1|Success||
|EC|sect113r1|Failed|key too small|
|EC|sect113r2|Failed|key too small|
|EC|sect131r1|Failed|key too small|
|EC|sect131r2|Failed|key too small|
|EC|sect163k1|Failed|no shared cipher|
|EC|sect163r1|Failed|no shared cipher|
|EC|sect163r2|Failed|no shared cipher|
|EC|sect193r1|Failed|no shared cipher|
|EC|sect193r2|Failed|no shared cipher|
|EC|sect233k1|Failed|no shared cipher|
|EC|sect233r1|Failed|no shared cipher|
|EC|sect239k1|Failed|no shared cipher|
|EC|sect283k1|Failed|no shared cipher|
|EC|sect283r1|Failed|no shared cipher|
|EC|sect409k1|Failed|no shared cipher|
|EC|sect409r1|Failed|no shared cipher|
|EC|sect571k1|Failed|no shared cipher|
|EC|sect571r1|Failed|no shared cipher|
|EC|c2pnb163v1|Failed|no shared cipher|
|EC|c2pnb163v2|Failed|no shared cipher|
|EC|c2pnb163v3|Failed|no shared cipher|
|EC|c2pnb176v1|Failed|no shared cipher|
|EC|c2tnb191v1|Failed|no shared cipher|
|EC|c2tnb191v2|Failed|no shared cipher|
|EC|c2tnb191v3|Failed|no shared cipher|
|EC|c2pnb208w1|Failed|no shared cipher|
|EC|c2tnb239v1|Failed|no shared cipher|
|EC|c2tnb239v2|Failed|no shared cipher|
|EC|c2tnb239v3|Failed|no shared cipher|
|EC|c2pnb272w1|Failed|no shared cipher|
|EC|c2pnb304w1|Failed|no shared cipher|
|EC|c2tnb359v1|Failed|no shared cipher|
|EC|c2pnb368w1|Failed|no shared cipher|
|EC|c2tnb431r1|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls1|Failed|key too small|
|EC|wap-wsg-idm-ecid-wtls3|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls4|Failed|key too small|
|EC|wap-wsg-idm-ecid-wtls5|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls6|Failed|key too small|
|EC|wap-wsg-idm-ecid-wtls7|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls8|Failed|key too small|
|EC|wap-wsg-idm-ecid-wtls9|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls10|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls11|Failed|no shared cipher|
|EC|wap-wsg-idm-ecid-wtls12|Failed|no shared cipher|
|EC|brainpoolP160r1|Failed|no shared cipher|
|EC|brainpoolP160t1|Failed|no shared cipher|
|EC|brainpoolP192r1|Failed|no shared cipher|
|EC|brainpoolP192t1|Failed|no shared cipher|
|EC|brainpoolP224r1|Failed|no shared cipher|
|EC|brainpoolP224t1|Failed|no shared cipher|
|EC|brainpoolP256r1|Failed|no shared cipher|
|EC|brainpoolP256t1|Failed|no shared cipher|
|EC|brainpoolP320r1|Failed|no shared cipher|
|EC|brainpoolP320t1|Failed|no shared cipher|
|EC|brainpoolP384r1|Failed|no shared cipher|
|EC|brainpoolP384t1|Failed|no shared cipher|
|EC|brainpoolP512r1|Failed|no shared cipher|
|EC|brainpoolP512t1|Failed|no shared cipher|
|EC|SM2|Failed|no shared cipher|
|EC|curve25519|Success||
|EC|curve448|Success||

上述结果中，基于RSA(密钥长度1024或2048)生成的公钥证书的TLS连接都是成功的，基于EC生成的公钥证书的TLS连接只有曲线是secp384r1,secp521r1,secp256r1/prime256v1,curve25519以及curve448时是成功的。

除上述曲线外，EC中其他曲线在本试验中均连接失败，返回的错误信息主要是no shared cipher或key too small。

特别地，SM2是国密椭圆曲线，目前Openssl支持生成SM2密钥对，但由于缺少相应的TLS国际标准因此没有支持其TLS连接。<sup>[1]</sup>而GMSSL在做相应的实现工作<sup>[2]</sup>。

从上述连接结果中抽取出成功的情况，统计如下：

|algorithm|algParam|status|
|----|----|----|
|RSA|1024|Success|
|RSA|2048|Success|
|RSA|4096|Success|
|EC|secp384r1|Success|
|EC|secp521r1|Success|
|EC|prime256v1|Success|
|EC|curve25519|Success|
|EC|curve448|Success|

### 浏览器连接TLS服务
上述结果是使用基于NodeJS TLS库实现的客户端而得到的，接下来使用浏览器作为客户端与TLS服务端进行连接（只需针对上述连接结果为成功的公钥算法进行测试）。

运行命令:
```bash
yarn start:single <alg> <algParam>
```
如：
```bash
yarn start:single RSA 4096
```
```bash
yarn start:single EC curve25519
```
上述命令将生成公钥证书RSA.cert或EC.cert，并以此建立其TLS服务。

启动浏览器，访问地址https://localhost:8888 

将结果记录如下：

|algorithm|algParam|Chrome|Firefox|Edge|Safari|IE|
|----|----|----|----|----|----|----|
|RSA|1024|Success|Success|Success|Success|Success|
|RSA|2048|Success|Success|Success|Success|Success|
|RSA|4096|Success|Success|Success|Success|Success|
|EC|secp384r1|Success|Success|Success|Success|Success|
|EC|secp521r1|Failed(no shared cipher)|Success|Failed(no shared cipher)|Success|Failed(o shared cipher)|
|EC|prime256v1|Success|Success|Success|Success|Success|
|EC|curve25519|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|
|EC|curve448|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|Failed(no shared cipher)|

## 总结
从上述结果来看，目前要想成功建立TLS连接，同时兼容NodeJS客户端与上述主流浏览器，在生成实体身份公钥证书时，非对称密钥应该选择基于RSA算法或者EC算法中的secp384r1曲线或secp256r1/prime256v1曲线。

而secp384r1与secp256r1/prime256v1都是NIST的P系曲线<sup>[3]</sup>，基于对其后门的怀疑与担忧，目前还是使用RSA算法来构建公钥证书更为合适。<sup>[4]</sup>

也期待浏览器能早日实现对ed25519以及ed448证书的支持。

## 参考链接
1. https://github.com/openssl/openssl/issues/7491;
2. https://github.com/guanzhi/GmSSL 
3. Elliptic Curve Cryptography (ECC) Cipher Suites for Transport Layer Security (TLS) https://tools.ietf.org/search/rfc4492#page-32
4. Problems With Elliptic Curve CryptographyIn TLS and SSHJoe TestaPositron SecurityOctober 19, 2017
, https://www.rochestersecurity.org/wp-content/uploads/2017/10/RSS2017-T2-Testa.pdf