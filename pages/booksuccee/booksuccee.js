// pages/booksuccee/booksuccee.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     data:null,
     patientMessage:null,
     relations:"待就诊",
     result:"",
     accessToken:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let objects = JSON.parse(options.data);
    console.log(objects);
    let that = this
    this.setData({
      data: objects.data,
      patientMessage: objects.patientmessage,
      result: objects.result
    })
    if (objects.data.trans.hos =="42500982800"){
      that.setData({
        accessToken:"800EBED9-63E5-4408-A184-BE693DA32CB7"
      })
    } else if (objects.data.trans.hos == "Y0041800100"){
      that.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB6"
      })
    }
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
    let that = this
    console.log(that.data.result),
    console.log(that.data.accessToken)
    wx.showModal({
      title: '提示',
      content: '是否取消预约？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: '/booking/cancelbooking',
            method:"post",
            data:{
              "bookingID": that.data.result,
              "accessToken": that.data.accessToken,
              "openUserID": app.globalData.openId,
            },
            success:function(res){
              console.log(res)
              that.setData({
                relations: "已取消"
              })
            }
          }) //取消预约jieko
        } else {
          initdata(that)
        }
      }
    })
  }
})