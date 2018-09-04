// pages/maps/maps.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    la:"",
    lo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   this.setData({
     la: options.la,
     lo: options.lo,
     place: options.place
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
  click: function (e) {
    console.log(Number(this.data.la))
    console.log(Number(this.data.lo))
    wx.openLocation({
      latitude:Number(this.data.la),
      longitude:Number(this.data.lo),
      scale: 18,
      name:this.data.place,
      address: '长兴路93号'
    })
  },
})