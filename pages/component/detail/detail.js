// detail.js
const util = require('../../../utils/util.js')
const tabObj = {
  'ask': '问答',
  'good': '精华',
  'share': '分享',
  'dev': '测试'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    cnodeAccessTK: '',
    userId: '',
    thumbCount: 0,
    topicId: ''
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
    
    // 获取cnodeAccessTK, 登录用户ID
    const { 
      cnodeAccessTK = '',
      userId = '' 
    } = wx.getStorageSync('userLocal')
    if (cnodeAccessTK) {
      this.setData({
        cnodeAccessTK,
        userId,
        topicId: id
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
    // onShow声明周期
    if (this.data.topicId) {
      this.getTopicDetail(this.data.topicId)
    } 
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
        accesstoken: this.data.cnodeAccessTK || ''
      },
      success: res => {
        let { data } = res.data
        data.create_at = util.formatTime(new Date(data.create_at))
        if (data.replies.length > 0) {
          data.replies.forEach(item => {
            item.create_at = util.formatTime(new Date(item.create_at))
            if (item.reply_id) {
              // 如果回复reply_id有值，说明是@replyName
              data.replies.forEach(replyItem => {
                if (replyItem.id == item.reply_id) {
                   item.replyName = replyItem.author.loginname
                }
              })
            }
          })
        }
        data.tabName = tabObj[data.tab]
        this.setData({
          detailData: data
        }, () => {
          wx.hideLoading()
        })
      }
    })
  },

  /*
  * 回复
  */
  handleReply: function(e) {
    const { topicid, replyid } = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['回复'],
      success: res => {
        const tabIndex = res.tapIndex
        if (tabIndex == 0) {
          if (this.data.cnodeAccessTK) {
            wx.navigateTo({
              url: `../reply/reply?replyType=reply&topicId=${topicid}&replyId=${replyid}`,
            })
          } else {
            this.toUserPage()
          }
        }
      },
      fail: function (res) {
        // console.log(res.errMsg)
      }
    })
  },

  /*
  * 收藏主题
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
        const { success, error_msg, action } = res.data
        if (success) {
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
        } else {
          wx.showToast({
            title: error_msg,
            image: '../../../imgs/fail.png'
          })
        } 
      } 
    })
  },

  /*
  * 评论
  */
  handleComment: function(e) {
    const { topicid } = e.currentTarget.dataset
    // console.log(this.data.cnodeAccessTK)
    if (this.data.cnodeAccessTK) {
      wx.navigateTo({
        url: `../reply/reply?replyType=comment&topicId=${topicid}`
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
  },

  /**
   * 删除主题 cnode社区貌似没提供删除文章api
  */
  // handleDelete: function (e) {
  //   const { topicid } = e.currentTarget.dataset
  //   wx.showModal({
  //     title: '删除',
  //     content: '确定删除此文章吗？',
  //     success: res => {
  //       if (res.confirm) {
  //         wx.request({
  //           url: `https://cnodejs.org/api/v1/topics/delete`,
  //           method: 'post',
  //           data: {
  //             accesstoken: this.data.cnodeAccessTK,
  //             topic_id: topicid
  //           },
  //           success: () => {
  //             wx.showToast({
  //               title: '删除成功',
  //               icon: 'success',
  //               duration: 1500
  //             })
  //             setTimeout(() => {
  //               wx.navigateBack({
  //                 delta: 1
  //               })
  //             }, 1500)
  //           },
  //           fail: () => {
  //             wx.showToast({
  //               title: '删除失败',
  //               image: '../../../imgs/fail.png',
  //               duration: 1500
  //             })
  //           }
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // }

  /**
   * 编辑主题
  */
  handleEdit: function(e) {
    const { topicid } = e.currentTarget.dataset
    // console.log(this.data.cnodeAccessTK)
    wx.navigateTo({
      url: `../publish/publish?publishType=edit&topicId=${topicid}`
    })
  }
})