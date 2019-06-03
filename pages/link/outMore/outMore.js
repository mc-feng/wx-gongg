// pages/link/outMore/outMore.js
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
    console.log(JSON.parse(options.list))
    var list = JSON.parse(options.list)
    this.setData({
      list
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
  //到详情页
  linkDetail: function (res) {
    console.log(res.currentTarget.dataset.id)
    var httpCode = res.currentTarget.dataset.id;
    var msg = res.currentTarget.dataset.type;
    var value = res.currentTarget.dataset.value
    wx.navigateTo({
      url: '../outDetail/outDetail?id=' + httpCode + "&&msg=" + msg + "&&value=" + value,
    })
  },
})