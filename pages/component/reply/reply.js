// pages/component/reply/reply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicId: '',
    cnodeAccessTK: '',
    replyType: '',
    replyId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const { replyType, topicId, replyId } = options
    wx.setNavigationBarTitle({
      title: replyType == 'comment' ? '评论': '回复'
    })

    // 获取cnodeAccessTK
    const { cnodeAccessTK = '' } = wx.getStorageSync('userLocal')

    this.setData({
      topicId,
      replyId,
      cnodeAccessTK,
      replyType
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

  formSubmit: function(e) {
    const { submitCont } = e.detail.value
    if (submitCont.length == 0) {
      wx.showToast({
        title: '内容不能为空',
        image: '../../../imgs/tip-icon.png',
        duration: 1000
      })
    } else {
      const { replyType, topicId, cnodeAccessTK, replyId } = this.data
      wx.showLoading({
        title: '提交中',
      })
      setTimeout(() => {
        wx.request({
          url: `https://cnodejs.org/api/v1/topic/${topicId}/replies`,
          method: 'post',
          data: {
            accesstoken: cnodeAccessTK,
            content: submitCont,
            reply_id: replyType == 'comment' ? '' : replyId
          },
          success: () => {
            wx.hideLoading()
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }, 1500) 
    }
  }
})