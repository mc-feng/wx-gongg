// pages/docterdetails/docterdetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
     change:true,
     collect:false,
     date:null,
    docterbook: [{ "shengyu": "已满", "time": "08:00-09:00", "price": "38.00", "man": true }, { "shengyu": "余 3", "time": "11:00-17:00", "price": "48.00", "man": false }, { "shengyu": "余 5", "time": "17:00-19:00", "price": "58.00", "man": false }]
  },
  expand: function () {
    if(this.data.change ===false){
      this.setData({
        change: true
      })
    }else{
      this.setData({
        change: false
      })
    }
  },
  collectchange:function(){
    if (this.data.collect === false) {
      this.setData({
        collect: true
      })
    } else {
      this.setData({
        collect: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let objects= JSON.parse(options.date);

    this.setData({ date: objects });
  },
  linkBook:function(e){
    let str = JSON.stringify(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../bookorder/bookorder?data=' + str,
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