// pages/expertConsultation/expertDetails/expertDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: true,
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
  //点击收藏
  collectchange: function () {
    if (this.data.collect === false) {
      var that = this
      console.log(app.globalData.openId)
      wx.request({
        url: '/medicalcard/deletedoclist',
        method: "post",
        data: {
          "docID": that.data.date.doccode,
          "openID": app.globalData.openId//--openID
        },
        success: function (res) {
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 2000
          })
          console.log(res)
        }
      })
      this.setData({
        collect: true
      })
    } else {
      var that = this
      wx.request({
        url: '/medicalcard/adddoclist',
        method: "post",
        data: {
          "docID": that.data.date.doccode,
          "openID": app.globalData.openId//--openID
        },
        success: function (res) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          console.log(res)
        }
      })
      this.setData({
        collect: false
      })
    }
  },
})