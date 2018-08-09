// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nav:false,
      class1:true,
      class2: true,
      class3: true,
      class4: true,
      class5: true,
      class6: true,
      class7: true,
      class8: true,  
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
  changenav:function(){
    this.setData({
      nav:!this.data.nav
    })
  },
  changeclass1:function(){
    this.setData({
      class1: !this.data.class1
    })
  },
  changeclass2: function () {
    this.setData({
      class2: !this.data.class2
    })
  },
  changeclass3: function () {
    this.setData({
      class3: !this.data.class3
    })
  },
  changeclass4: function () {
    this.setData({
      class4: !this.data.class4
    })
  },
  changeclass5: function () {
    this.setData({
      class5: !this.data.class5
    })
  },
  changeclass6: function () {
    this.setData({
      class6: !this.data.class6
    })
  },
  changeclass7: function () {
    this.setData({
      class7: !this.data.class7
    })
  },
  changeclass8: function () {
    this.setData({
      class8: !this.data.class8
    })
  }
})