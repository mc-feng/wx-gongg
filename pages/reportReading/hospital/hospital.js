// pages/reportReading/hospital/hospital.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contol:true
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
    var that = this
    wx.request({
      url: '/common/getAnalysisReportList',
      method: "post",
      data: {
        "openId": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        if (res.success) {
          var result = res.result;
          for (var i = 0; i < result.length; i++) {
            var imgarr = result[i].photoName.split(";")
            var imgsrc = "https://www.tonticn.cn:8081/" + imgarr[0]
            var imgNum = imgarr.length
            result[i].imgsrc = imgsrc;
            result[i].imgNum = imgNum
          }
          that.setData({
            result: result
          })
        } else {
          wx.showToast({
            title: "请退出重试",
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: "请求错误请重试",
        })
      }
    })
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
  //连接详情
  linkToDel:function(e){
    console.log(e)
    wx.showLoading({
      title: '数据请求中',
    })
    var id = e.currentTarget.dataset.id
    var timestamp = e.currentTarget.dataset.timestamp
    var that = this
    if (that.data.contol){
      that.data.contol = false;
      wx.request({
        url: '/common/getAnalysisReportData',
        method: "post",
        data: {
          reportId: id
        },
        success: function (res) {
          console.log(res)
          var reslut = JSON.stringify(res.result)
          wx.navigateTo({
            url: '../dataEnter/dataEnter?str=' + reslut + "&&reportId=" + id + "&&timestamp=" + timestamp
          });
          wx.hideLoading();
          that.data.contol = true
        }
      })
    }
  }
})