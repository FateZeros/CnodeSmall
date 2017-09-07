// question.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前页数
    curPage: 1,
    // 问答列表
    questionList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getQuestionList(this.data.curPage)
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
    this.getQuestionList(this.data.curPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getQuestionList: function(page) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      method: 'get',
      data: {
        tab: 'ask',
        page,
        limit: 10
      },
      success: res => {
        const { data } = res.data
        this.setData({
          curPage: page + 1,
          questionList: data
        })
      }
    })
  }
})