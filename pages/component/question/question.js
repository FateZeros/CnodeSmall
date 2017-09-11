// question.js
const util = require('../../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前页数
    curPage: 1,
    // 问答列表
    questionList: [],
    // 是否正在加载页面
    isLoadingPage: true,
    // 加载更多数据 0-加载完成 1-正在加载数据 2-暂无数据
    loadingStatus: 3
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
    this.setData({
      loadingStatus: 1
    })
    // 显示加载更多数据loading，故设置此延迟
    setTimeout(() => {
      this.getQuestionList(this.data.curPage)
    }, 1500) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取问答列表
   */
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
        let { data } = res.data
        // 没有数据
        if (data.length == 0) {
          this.setData({
            loadingStatus: 2,
            isLoadingPage: false
          })
        } else {
          data.forEach(item => {
            item.create_at = util.formatTime(new Date(item.create_at))
          })
          this.setData({
            curPage: page + 1,
            isLoadingPage: false,
            loadingStatus: 2,
            questionList: [...this.data.questionList, ...data]
          })
        }
      }
    })
  },

  /*
  * 跳转到文章详情
  */
  handleTodetail: function(e) {
    const { id } = e.currentTarget.dataset
    // const id = '59b5e55e1b37e54f6793c46a'
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  }
})