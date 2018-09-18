// pages/chooseHospital/chooseHospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addbind :[],
    alreadybind:[],
    transData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    let transData = JSON.parse(options.transData)
    let cardData = JSON.parse(options.cardData);
    that.setData({
      addbind: cardData.result[0],
      alreadybind: cardData.result[1],
      transData: transData
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
  addToCard:function(e){
    let that = this
    if (e.currentTarget.dataset.hosname == "金山总部"){
      that.setData({
        accessToken:"800EBED9-63E5-4408-A184-BE693DA32CB7"
      })
    } else if (e.currentTarget.dataset.hosname == "市区分部"){
      that.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB6"
      })
    }
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/getRecordCard',
      method: "post",
      data: {
        "openID": that.data.transData.openID,
        "tel": that.data.transData.tel,
        "idCard": that.data.transData.idCard,
        "patientName": that.data.transData.patientName,
        "cardNo": that.data.transData.cardNo,
        "cardType": that.data.transData.cardType,
        "cardProperty": that.data.transData.cardProperty,
        "accessToken": that.data.accessToken,
        "openUserID": "2088022943884345",
        "extInfo": e.currentTarget.dataset.hosname
      },
      success: function (res) {
        console.log(res)
        if (res.data.message == "绑定成功") {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
        }else{
          wx.showToast({
            title: '绑定失败',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  }
})