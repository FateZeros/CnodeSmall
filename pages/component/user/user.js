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
  
  // 查看历史登录记录
  checkLoginHistory: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    const { 
      cnodeAccessTK, 
      loginname,
      avatarUrl
    } = wx.getStorageSync('userLocal')
    if (cnodeAccessTK) {
      this.setData({
        cnodeAccessTK,
        userInfo: {
          avatarUrl,
          loginname
        }
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

  /*
  * 扫描二维码登录cnode社区
  */
  handleScanCode: function () {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        // 获取cnode.org社区登录的accesstoken
        wx.showLoading({
          title: '登录中',
        })
        setTimeout(() => {
          this.getUserInfo(res.result)
        }, 1500) 
      },
      fail: () => {
        wx.showToast({
          title: '扫码失败',
          image: '../../../imgs/fail.png',
          duration: 1500
        })
      }
    })
  },

  /*
  * 根据二维码token获取用户信息
  */
  getUserInfo: function(token) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken',
      method: 'post',
      data: {
        accesstoken: token 
      },
      success: res => {
        // 用户名 用户头像 用户ID
        const { loginname, avatar_url: avatarUrl, id: userId } = res.data
        wx.setStorage({
          key: "userLocal",
          data: {
            cnodeAccessTK: token,
            loginname,
            userId,
            avatarUrl
          },
          success: () => {
            this.setData({
              cnodeAccessTK: token,
              userInfo: {
                avatarUrl,
                loginname
              }
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            })
          }
        })        
      },
      fail: function() {
        wx.showToast({
          title: '登录失败',
          image: '../../../imgs/fail.png',
          duration: 1500
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  handleToPage: function(e) {
    const { pagename } = e.currentTarget.dataset
    switch (pagename) {
      case 'publish':
        wx.navigateTo({
          url: '../publish/publish'
        })
        break;
      case 'collect':
        wx.navigateTo({
          url: '../collect/collect'
        })
        break;
      case 'message':
        wx.navigateTo({
          url: '../message/message'
        })
        break;
      case 'setting':
        wx.navigateTo({
          url: '../setting/setting'
        })
        break;
      default:
        break;  
    } 
  }
})
