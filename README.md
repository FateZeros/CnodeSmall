![](https://img.shields.io/badge/language-js-orange.svg)
![](https://img.shields.io/badge/platform-wechat-lightgrey.svg)
![](https://img.shields.io/badge/platform-cnode%E7%A4%BE%E5%8C%BA-brightgreen.svg)

## Cnode社区-微信小程序版
[Cnode社区](https://cnodejs.org)<br>
在社区注册后 -> 设置 -> Access Token／二维码 <br>

<div style="display: flex; margin-top: 12px;">
<img style="width: 187.5px; height: 375px; margin-right: 20px;" src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode1.png" />
<img style="width: 187.5px; height: 375px; margin-right: 20px;"src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode2.png" />
<img style="width: 187.5px; height: 375px; margin-right: 20px;"src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode3.png" />
</div>

<div style="display: flex; margin-top: 12px;">
<img style="width: 187.5px; height: 375px; margin-right: 20px;"src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode4.png" />
<img style="width: 187.5px; height: 375px; margin-right: 20px;" src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode5.png" />
<img style="width: 187.5px; height: 375px; margin-right: 20px;"src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode6.png" />
</div>

## 功能
- [ ] 查看社区所有区块的发布文章列表
- [ ] 在社区网站上登录，通过扫描二维码在小程序中登录
- [ ] 登录后，可以发表文章，查看自己收藏的文章 
- [ ] 文章详情查看，在登录后，可以进行收藏/取消收藏，评论／回复，点赞／取消点赞操作
- [ ] 登录后对自己的文章可以进行编辑操作

## 目录结构
```
.
├── app.js
├── app.json
├── app.wxss
├── pages
│   ├── common
│   │   └── loadingMore            #上拉加载更多
│   │       ├── loadingMore.js
│   │       └── loadingMore.wxml
│   └── component
│       ├── allData
│       │   ├── allData.js
│       │   ├── allData.json
│       │   └── allData.wxml
│       ├── collect
│       │   ├── collect.js
│       │   ├── collect.json
│       │   ├── collect.wxml
│       │   └── collect.wxss
│       ├── detail
│       │   ├── detail.js
│       │   ├── detail.json
│       │   ├── detail.wxml
│       │   └── detail.wxss
│       ├── essence
│       │   ├── essence.js
│       │   ├── essence.json
│       │   └── essence.wxml
│       ├── index               #主页
│       │   ├── index.js
│       │   ├── index.json
│       │   ├── index.wxml
│       │   └── index.wxss
│       ├── logs                #登录日志
│       │   ├── logs.js
│       │   ├── logs.json
│       │   ├── logs.wxml
│       │   └── logs.wxss
│       ├── publish
│       │   ├── publish.js
│       │   ├── publish.json
│       │   ├── publish.wxml
│       │   └── publish.wxss
│       ├── question
│       │   ├── question.js
│       │   ├── question.json
│       │   ├── question.wxml
│       │   └── question.wxss
│       ├── reply
│       │   ├── reply.js
│       │   ├── reply.json
│       │   ├── reply.wxml
│       │   └── reply.wxss
│       └── user
│           ├── user.js
│           ├── user.json
│           ├── user.wxml
│           └── user.wxss
├── utils
│   └── util.js
└── weui.wxss
```

## weui
[weUI](https://github.com/Tencent/weui/wiki/getting-started)

## 小程序开发文档
[微信开发者文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)


## 遇到的问题
Q.小程序自带的showToast中title过长，显示不全。

Q:新增记录(例如评论)，返回列表页,要刷新页面才能显示 <br>
A:onShow() 进行页面监听，每打开页面一次都会调用。


