// pages/inNavigation/inNavigation.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /**
        * 页面配置
        */
    // tab切换
    currentTab: 0
  },
  onLoad: function () {

  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    console.log(e.detail.source)
    if (e.detail.source == "touch") {//判断是否由用户触摸导致
      that.setData({ currentTab: e.detail.current });
    }

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})