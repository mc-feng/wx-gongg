// pages/editPeopleMess/editPeopleMess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    identityCard:"",
    phoneNumber:"",
    exist:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/checkweachat',
      method: "post",
      data: {
        "openId": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        if(res.data.success){
          wx.request({
            url: 'http://192.168.2.165:8081/medicalcard/getweachat',
            method:"post",
            data: {
              "openId": app.globalData.openId
            },
            success:function(res){
              console.log(res)
              that.setData({
                userName: res.data.result.openUserName,
                identityCard: res.data.result.openIDCard,
                phoneNumber: res.data.result.openTel,
                exist: true
              })
            }
          })
        }
      }
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
  submitMessage:function(e){
    let that = this
    if(this.data.exist){
      wx.request({
        url: 'http://192.168.2.165:8081/medicalcard/updateweachat',
        method: "post",
        data: {
          "openId": app.globalData.openId,
          "openIDCard": that.data.identityCard,
          "openTel": that.data.phoneNumber,
          "openUserName": that.data.userName
        },
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }else{
      wx.request({
        url: 'http://192.168.2.165:8081/medicalcard/insertweachat',
        method: "post",
        data: {
          "openId": app.globalData.openId,
          "openIDCard": that.data.identityCard,
          "openTel": that.data.phoneNumber,
          "openUserName": that.data.userName
        },
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },
  getUseruserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },
  getUseridentityCard:function(e){
    this.setData({
      identityCard: e.detail.value
    })
    console.log(this.data.identityCard)
  },
  getUserphoneNumber:function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log(this.data.phoneNumber)
  }
})