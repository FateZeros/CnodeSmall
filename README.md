![](https://img.shields.io/badge/language-js-orange.svg)
![](https://img.shields.io/badge/platform-wechat-lightgrey.svg)
![](https://img.shields.io/badge/platform-cnode%E7%A4%BE%E5%8C%BA-brightgreen.svg)

## Cnode社区-微信小程序版
[Cnode社区](https://cnodejs.org)<br>
在社区注册后 -> 设置 -> Access Token／二维码 <br>

<div style="display: flex; margin-top: 12px;">
<img width="187.5px" height="375px"
src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode1.png" />
<img width="187.5px" height="375px" src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode2.png" />
<img width="187.5px" height="375px"
src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode3.png" />
</div>

<div style="display: flex; margin-top: 12px;">
<img width="187.5px" height="375px"
src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode4.png" />
<img width="187.5px" height="375px" src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode5.png" />
<img width="187.5px" height="375px"
src="https://github.com/FateZeros/CnodeSmall/blob/master/snapshoot/smallCode6.png" />
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

## 小程序走马观花
1. 与html不同：`view text navigator` 代替 `div span a`<br>
2. 每个page即是一个页面文件 <br>
3. app.json: 注册pages window tabBar networkTimeout <br>
[组件说明](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)<br>
4. js: 作为逻辑层 与wxml交互 有着丰富的网络，媒体，文件，数据缓存，位置，设备，界面...api <br>
5. wxml: 数据驱动的视图层 + 微信提供了大量的组件 表单 导航 媒体 画布

app.json配置底部导航栏
```
{
  "pages":[
    "pages/component/index/index",
    "pages/component/share/share",
    "pages/component/question/question",
    "pages/component/user/user",
    "pages/component/allData/allData",
    "pages/component/essence/essence",
    "pages/component/detail/detail",
    "pages/component/reply/reply",
    "pages/component/publish/publish",
    "pages/component/collect/collect",
    "pages/component/message/message",
    "pages/component/logs/logs",

    "pages/common/loadingMore/loadingMore"  
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  },
  "tabBar": {
    "color": "#bfbfbf",
    "selectedColor": "#1afa29",
    "borderStyle": "black",
    "list": [{
      "selectedIconPath": "imgs/home1.png",
      "iconPath": "imgs/home2.png",
      "pagePath": "pages/component/index/index",
      "text": "首页"
    }, {
      "selectedIconPath": "imgs/elite1.png",
      "iconPath": "imgs/elite2.png",
      "pagePath": "pages/component/share/share",
      "text": "分享"
    }, {
      "selectedIconPath": "imgs/question1.png",
      "iconPath": "imgs/question2.png",
      "pagePath": "pages/component/question/question",
      "text": "问答"
    },
    {
      "selectedIconPath": "imgs/login1.png",
      "iconPath": "imgs/login2.png",
      "pagePath": "pages/component/user/user",
      "text": "我的"
    }] 
  }
}

```

## 遇到的问题
Q.小程序自带的showToast中title过长，显示不全。

Q:新增记录(例如评论)，返回列表页,要刷新页面才能显示 <br>
A:onShow() 进行页面监听，每打开页面一次都会调用。

Q:二级页面无法navigateTo到一级菜单页面 <br>
A:使用switchTab

