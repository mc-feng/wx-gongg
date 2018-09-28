// pages/tologin/tologin.js
const app = getApp()
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
    wx.authorize({
      scope: "scope.userLocation"
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
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码
    app.globalData.userInfo = e.detail.userInfo
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'http://192.168.2.165:8081/medicalcard/getopenid',
          method: "post",
          data: {
            "openId": res.code
          },
          success: function (res) {
            console.log(res)
            var openId = res.result
            console.log(openId)
            app.globalData.openId = openId
            wx.request({
              url: 'http://192.168.2.165:8081/common/getweachat',//获取游客记录
              method: "post",
              data: {
                "hospitalID": openId,
                "hospitalName": app.globalData.userInfo.nickName
              },
              success: function (res) {
                console.log(res)
              }
            })
          }
        })
      }
    })
    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  }
})