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
    cnodeAccessTK: '',
    thumbCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { id } = options
    wx.showLoading({
      title: '加载中',
    })
    
    // 获取cnodeAccessTK
    const cnodeAccessTK = wx.getStorageSync('cnodeAccessTK')
    if (cnodeAccessTK) {
      this.setData({
        cnodeAccessTK
      })
    }

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
        mdrender: false,
        accesstoken: this.data.cnodeAccessTK
      },
      success: res => {
        let { data } = res.data
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
        }, () => {
          wx.hideLoading()
        })
      }
    })
  },

  /*
  * 回复
  */
  handleReply: function() {
    wx.showActionSheet({
      itemList: ['回复'],
      success: res => {
        const tabIndex = res.tapIndex
        if (tabIndex == 0) {
          if (this.data.cnodeAccessTK) {
            wx.navigateTo({
              url: '../reply/reply?replyType=reply',
            })
          } else {
            this.toUserPage()
          }
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /*
  * 收藏
  */
  handleCollect: function() {
    if (this.data.cnodeAccessTK) {
      // 此文章是否已被收藏
      const isCollect = this.data.detailData.is_collect
      let questUrl = 'https://cnodejs.org/api/v1/topic_collect/collect'
      if (isCollect) {
        questUrl = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
      }
      wx.request({
        url: questUrl,
        method: 'post',
        data: {
          accesstoken: this.data.cnodeAccessTK,
          topic_id: this.data.detailData.id
        },
        success: () => {
          this.data.detailData.is_collect = !isCollect
          this.setData({
            detailData: this.data.detailData
          })
          wx.showToast({
            title: isCollect ? '已取消收藏' : '收藏成功',
            icon: 'success',
            duration: 1500
          })
        },
        fail: () => {
          wx.showToast({
            title: isCollect ? '已取消收藏' : '收藏成功',
            image: '../../../imgs/fail.png',
            duration: 1500
          })
        }
      })
    } else {
      this.toUserPage()
    }
  },

  /*
  * 对评论点赞
  */
  handleThumb: function(e) {
    const { id } = e.currentTarget.dataset
    wx.request({
      url: `https://cnodejs.org/api/v1/reply/${id}/ups`,
      method: 'post',
      data: {
        accesstoken: this.data.cnodeAccessTK
      },
      success: res => {
        const { action } = res.data
        if (action == 'up') {
          this.data.detailData.replies.forEach(item => {
            if (item.id == id) {
              item.is_uped = true
              // 本地让点赞数组长度增加1
              item.ups.push(id)
            }
          })
        } else {
          this.data.detailData.replies.forEach(item => {
            if (item.id == id) {
              item.is_uped = false
              // 本地让点赞数组长度减少1
              item.ups.pop()
            }
          })
        }
        this.setData({
          detailData: this.data.detailData
        })
      } 
    })
  },

  /*
  * 评论
  */
  handleComment: function() {
    // console.log(this.data.cnodeAccessTK)
    if (this.data.cnodeAccessTK) {
      wx.navigateTo({
        url: '../reply/reply?replyType=comment'
      })
    } else {
      this.toUserPage()
    }
  },

  /*
  * 跳转到登录页面 提示窗
  */
  toUserPage: function() {
    wx.showModal({
      title: '提示',
      content: '您还未登录，是否先去登录？',
      success: res => {
        if (res.confirm) {
          wx.switchTab({
            url: '../user/user',
            fail: function (err) {
              console.log(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})