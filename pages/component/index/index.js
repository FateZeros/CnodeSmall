//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    tabs: ["全部", "精华"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderOffset: res.windowWidth / this.data.tabs.length *                                 this.data.activeIndex
        })
      },
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id 
    })
  }
})
