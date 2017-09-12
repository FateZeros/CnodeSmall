//user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: '../../../imgs/user.png'
    },
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cnodeAccessTK: ''
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    const cnodeAccessTK = wx.getStorageSync('cnodeAccessTK')
    if (cnodeAccessTK) {
      this.setData({
        cnodeAccessTK
      })
    }
  },

  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

  // getUserInfo: function(e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  handleScanCode: function () {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        // 获取cnode.org社区登录的accesstoken
        wx.setStorage({
          key: "cnodeAccessTK",
          data: res.result,
          success: () => {
            this.setData({
              cnodeAccessTK: res.result
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            })
          }
        }) 
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          image: '../../../imgs/fail.png',
          duration: 1500
        })
      }
    })
  }
})
