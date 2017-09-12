//index.js
//获取应用实例
const app = getApp()
const sliderWidth = 96
const util = require('../../../utils/util.js')

Page({
  data: {
    tabs: ["全部", "精华"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 当前首页页数
    curPage: 1,
    // 精华页数
    curEssencePage: 1,
    // 首页全部列表
    dataList: [],
    // 精华列表
    essenceList: [],
    // 加载更多数据 0-加载完成 1-正在加载数据 2-暂无数据
    loadingStatus: 3
  },
  
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length -                                sliderWidth ) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length *                               this.data.activeIndex
        })
      },
    })
    wx.showLoading({
      title: '加载中'
    })
    this.getDataList(0, this.data.curPage)
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
      const activeIndex = this.data.activeIndex
      const page = activeIndex == 0 ? this.data.curPage :                                     this.data.curEssencePage
      this.getDataList(activeIndex, page)
    }, 1500)
  },

  tabClick: function(e) {
    const activeIndex = e.currentTarget.id
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex
    }, () => {
      // 第一次tab切换到精华列表时
      if (this.data.essenceList.length == 0) {
        this.setData({
          loadingStatus: 1
        })
        setTimeout(() => {
          this.getDataList(activeIndex, 1)
        }, 1500) 
      } 
    })
  },

  getDataList: function (activeIndex, page) {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      method: 'get',
      data: {
        tab: activeIndex == 0 ? 'all' : 'good',
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
          if (activeIndex == 0) {
            this.setData({
              curPage: page + 1,
              isLoadingPage: false,
              loadingStatus: 2,
              dataList: [...this.data.dataList, ...data]
            }, () => {
              wx.hideLoading()
            })
          } else {
            this.setData({
              curEssencePage: page + 1,
              loadingStatus: 2,
              essenceList: [...this.data.essenceList, ...data]
            }, () => {
              wx.hideLoading()
            })
          }
          
        }
      }
    })
  },

  /*
  * 跳转到文章详情
  */
  handleTodetail: function (e) {
    const { id } = e.currentTarget.dataset
    // const id = '59b5e55e1b37e54f6793c46a'
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  }
})
