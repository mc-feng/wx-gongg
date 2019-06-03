// pages/link/lock/lock.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      navName: options.str
    })
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: '/common/checkdata',
      method: "post",
      data: {
        "hospitalID": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.result == 1) {
          var navName = that.data.navName
          if(navName=="报告查询"){
            wx.redirectTo({
              url: '../../reportQuery/query/query',
            })
          } else if(navName=="排队叫号"){
            wx.redirectTo({
              url: '../../callNumber/list/list',
            })
          } else if (navName=="住院服务"){
            wx.redirectTo({
              url: "../../hospitalServe/hospitalSelect/hospitalSelect",
            })
          } else if (navName == "手术方案"){
            wx.redirectTo({
              url: "../../shoushu/index/index",
            })
          } else if (navName =="诊间付费"){
            wx.redirectTo({
              url: "../../payService/payChoose/payChoose",
            })
          }
        }
        that.setData({
          result: res.result
        })
      }
    })
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
  linkToPeople: function (e) {
    wx.navigateTo({
      url: '../../editPeopleMess/editPeopleMess',
    })
  },
  linkToCard: function (e) {
    wx.navigateTo({
      url: '../../managePatient/managePatient?card=bing',
    })
  }
})