// pages/bookdepartments/bookdepartments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:true,
    normallist: [
      { 'content': '感染与免疫科', "id": 0, "url": "../bookdetails/bookdetails" },
      { 'content': '感染与免疫科', "id": 1, "url": "../bookdetails/bookdetails"}, 
      { 'content': '感染与免疫科', "id": 2, "url":"../bookdetails/bookdetails"},
      { 'content': '感染与免疫科', "id": 3, "url": "../bookdetails/bookdetails"}, 
      { 'content': '感染与免疫科', "id": 4, "url": "../bookdetails/bookdetails"},
      { 'content': '感染与免疫科', "id": 5, "url": "../bookdetails/bookdetails"}, 
      { 'content': '感染与免疫科', "id": 6, "url": "../bookdetails/bookdetails"}, 
      { 'content': '感染与免疫科', "id": 7, "url": "../bookdetails/bookdetails"},
      { 'content': '感染与免疫科', "id": 8, "url": "../bookdetails/bookdetails"},
      { 'content': '感染与免疫科', "id": 9, "url": "../bookdetails/bookdetails"}, 
      { 'content': '感染与免疫科', "id": 10, "url": "../bookdetails/bookdetails"}]
  },
  tabNav: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header = options.header;
    this.setData({
      title: header
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
  
  }
})