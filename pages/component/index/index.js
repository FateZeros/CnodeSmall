//index.js
//获取应用实例
const app = getApp()
var sliderWidth = 96
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
        console.log(res.windowWidth, this.data.tabs.length)
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length -                                sliderWidth ) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length *                               this.data.activeIndex
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
