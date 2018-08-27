// pages/booksuccee/booksuccee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     data:null,
     patientMessage:null,
     relations:"待就诊"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let objects = JSON.parse(options.data);
    console.log(objects);
    this.setData({
      data: objects.data,
      patientMessage: objects.patientmessage
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
  cancel: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否取消预约？',
      success: function (res) {
        if (res.confirm) {
          // wx.request({
          //   url: 'http://192.168.2.165:8081/booking/cancelbooking',
          //   method:"post",
          //   data:{
          //     "bookingID": this.data.bookingID,
          //     "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
          //     "openUserID": "2088022943884345",
          //   },
          //   success:function(res){
          //     that.setData({
          //       relations: "已取消"
          //     })
          //   }
          // }) //取消预约jieko
          that.setData({
            relations: "已取消"
          })
        } else {
          initdata(that)
        }
      }
    })
  }
})