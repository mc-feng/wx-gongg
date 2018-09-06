// pages/ways/ways.js
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
  linkToJin:function(e){
    wx.openLocation({
      latitude: 30.7898400000,
      longitude: 121.3400100000,
      scale: 18,
      name: "金山总部",
      address: '上海市金山区漕廊公路2901号'
    })
    // wx.navigateTo({
    //   url: '../maps/maps?la=' + "30.7898400000&lo=" +"121.3400100000&place="+"金山总部",
    // })
  },
  linkToShi:function(e){
    wx.openLocation({
      latitude: 31.2739100000,
      longitude: 121.4703200000,
      scale: 18,
      name: "市区分部",
      address: '上海市虹口同心路921号'
    })
    // wx.navigateTo({
    //   url: '../maps/maps?la=' + "31.2739100000&lo=" + "121.4703200000&place=" + "市区分部",
    // })
  }
  
})