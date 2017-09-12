// detail.js
const util = require('../../../utils/util.js')
const tabObj = {
  'ask': '问答',
  'good': '精华',
  'share': '分享'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    replyList: [],
    // 是否正在加载页面
    isLoadingPage: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { id } = options
    this.getTopicDetail(id)
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

  /*
  * 获取文章详情
  */
  getTopicDetail: function(id) {
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${id}`,
      method: 'get',
      data: {
        mdrender: false
      },
      success: res => {
        let { data } = res.data
        console.log(data)
        data.create_at = util.formatTime(new Date(data.create_at))
        if (data.replies.length > 0) {
          data.replies.forEach(item => {
            item.create_at = util.formatTime(new Date(item.create_at))
          })
        }
        data.tabName = tabObj[data.tab]
        this.setData({
          detailData: data,
          isLoadingPage: false
        })
      }
    })
  },

  // 回复评论
  handleReply: function() {
    wx.showActionSheet({
      itemList: ['回复'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})