![](https://img.shields.io/badge/language-js-orange.svg)
![](https://img.shields.io/badge/platform-wechat-lightgrey.svg)
![](https://img.shields.io/badge/platform-cnode%E7%A4%BE%E5%8C%BA-brightgreen.svg)

## Cnode社区-微信小程序版
[Cnode社区](https://cnodejs.org)<br>
在社区注册后 -> 设置 -> Access Token／二维码 <br>

![](https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode1.png)
![](https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode2.png)


## 遇到的问题
Q.小程序自带的showToast中title过长，显示不全。

Q:新增记录(例如评论)，返回列表页,要刷新页面才能显示 <br>
A:onShow() 进行页面监听，每打开页面一次都会调用。


[微信开发者文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)