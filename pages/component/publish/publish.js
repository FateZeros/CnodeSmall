// publish.js
const tabObj = {
  0: 'dev',
  1: 'ask',
  2: 'share',
  3: 'job'
}
const tabArr = ['dev', 'ask', 'share', 'job']

Page({
  /**
   * 页面的初始数据
   */
  data: {
    chosedtype: 0,
    // 文章主题
    title: '',
    // 文章内容
    content: '',
    // 新建主题时 tab类型: dev, ask, share, job
    // 开发客户端，务必使用 dev新建
    typeArr: ['测试', '问答', '分享', '工作'],
    cnodeAccessTK: '',
    // 新建主题 or 修改主题
    publishType: '',
    // 是否正在发表
    isPublishing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取cnodeAccessTK
    const { cnodeAccessTK = '' } = wx.getStorageSync('userLocal')
    const { publishType, topicId } = options

    this.setData({
      cnodeAccessTK,
      publishType,
      topicId
    })

    if (publishType) {
      wx.setNavigationBarTitle({
        title: '编辑主题'
      })
      this.getTopicDetail(topicId)
    }
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
    // console.log(topicTitle, topicCont)
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
      const { cnodeAccessTK, chosedtype, publishType, topicId } = this.data
      // console.log(tabObj[chosedtype])
      this.setData({
        isPublishing: true
      })
      const addUrl = 'https://cnodejs.org/api/v1/topics'
      const updateUrl = 'https://cnodejs.org/api/v1/topics/update'
      wx.request({
        url: publishType == 'edit' ? updateUrl : addUrl,
        method: 'post',
        data: {
          accesstoken: cnodeAccessTK,
          title: topicTitle,
          // 暂时全部作为测试数据发表
          // tab: tabObj[chosedtype],
          tab: 'dev',
          content: topicCont,
          topic_id: publishType == 'edit' ? topicId : ''
        },
        success: (res) => {
          const data = res.data
          this.setData({
            isPublishing: false
          })
          if (data.success) {
            wx.showToast({
              title: '发表成功',
              icon: 'success',
              duration: 1500
            })
            // 发表成功后返回
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '频率限制',
              image: '../../../imgs/tip-icon.png',
              duration: 1500
            })
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '发表失败',
            image: '../../../imgs/tip-icon.png',
            duration: 1500
          })
        }
      })
    }
  },

  /**
   * 获取主题详情
  */
  getTopicDetail: function(topicId) {
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${topicId}`,
      method: 'get',
      data: {
        mdrender: false,
        accesstoken: this.data.cnodeAccessTK
      },
      success: res => {
        let { data } = res.data
        this.setData({
          chosedtype: tabArr.indexOf(data.tab) || 0,
          title: data.title,
          content: data.content,
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取文章失败'
        })
      }
    })
  }

})