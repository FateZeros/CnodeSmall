// collect.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收藏列表
    collectList: [],
    // 登录用户名
    loginname: '',
    // 当前页数
    curPage: 1,
    // 加载更多数据 0-加载完成 1-正在加载数据 2-暂无数据
    loadingStatus: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取cnodeAccessTK
    const { loginname } = wx.getStorageSync('userLocal')

    this.setData({
      loginname
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getCollectList(loginname, this.data.curPage)
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
    // 用户收藏接api 未分页
    // this.setData({
    //   loadingStatus: 1
    // })
    // // 显示加载更多数据loading，故设置此延迟
    // setTimeout(() => {
    //   this.getCollectList(this.data.loginname, this.data.curPage)
    // }, 1500) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getCollectList: function(loginname, page) {
    wx.request({
      url: `https://cnodejs.org/api/v1/topic_collect/${loginname}`,
      method: 'get',
      data: {
        page,
        limit: 10
      },
      success: res => {
        let { data } = res.data
        // 没有数据
        if (data.length == 0) {
          this.setData({
            loadingStatus: 2
          })
        } else {
          data.forEach(item => {
            item.create_at = util.formatTime(new Date(item.create_at))
          })
          this.setData({
            curPage: page + 1,
            loadingStatus: 2,
            collectList: [...this.data.collectList, ...data]
          }, () => {
            wx.hideLoading()
          })
        }
      }
    })
  },

  /*
  * 跳转到文章详情
  */
  handleTodetail: function (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  }
})