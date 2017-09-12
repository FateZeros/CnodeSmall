// publish.js
const tabObj = {
  0: 'dev',
  1: 'ask',
  2: 'share',
  3: 'job'
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    chosedtype: 0,
    // 新建主题时 tab类型: dev, ask, share, job
    // 开发客户端，务必使用 dev新建
    typeArr: ['测试', '问答', '分享', '工作'],
    cnodeAccessTK: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取cnodeAccessTK
    const { cnodeAccessTK = '' } = wx.getStorageSync('userLocal')

    this.setData({
      cnodeAccessTK
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindPickerChange: function (e) {
    this.setData({
      chosedtype: e.detail.value
    })
  },

  /**
   * 发表
  */
  formSubmit: function (e) {
    const { topicTitle, topicCont } = e.detail.value
    console.log(topicTitle, topicCont)
    if (topicTitle.length == 0) {
      wx.showToast({
        title: '标题不能为空',
        image: '../../../imgs/tip-icon.png',
        duration: 1000
      })
    } else if (topicCont.length == 0) {
      wx.showToast({
        title: '内容不能为空',
        image: '../../../imgs/tip-icon.png',
        duration: 1000
      })
    } else {
      console.log('submit')
      const { cnodeAccessTK, chosedtype } = this.data
      wx.showLoading({
        title: '发表中',
      })
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'post',
        data: {
          accesstoken: cnodeAccessTK,
          title: topicTitle,
          // 暂时全部作为测试数据发表
          tab: 'dev',
          content: topicCont
        },
        success: () => {
          setTimeout(() => {
            wx.showToast({
              title: '发表成功',
              icon: 'success',
              duration: 1500
            })
          }, 1500)
        },
        fail: () => {
          wx.showToast({
            title: '发表失败',
            image: '../../../imgs/tip-icon.png',
            duration: 1000
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }
  }
})