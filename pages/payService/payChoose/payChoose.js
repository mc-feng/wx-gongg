// pages/payService/payChoose/payChoose.js
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
  navLink:function(e){
    var chooseName = e.currentTarget.dataset.name
    console.log(chooseName)
    if (chooseName =="金山院区"){
      var token = "800EBED9-63E5-4408-A184-BE693DA32CB7"
    }else{
      var token = "800EBED9-63E5-4408-A184-BE693DA32CB6"
    }
    wx.navigateTo({
      url: '../payQuery/payQuery?hospitalToken=' + token,
    })
  }
})