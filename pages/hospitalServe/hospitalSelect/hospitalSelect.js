// pages/hospitalServe/hospitalSelect/hospitalSelect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex:"0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: '/medicalcard/getweachattopatient',
      method: "post",
      data: {
        "openId": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        var showData = [];
        for (var i = 0; i < res.result.length; i++) {
          showData.push(res.result[i].openUserName + " " + res.result[i].createTime)
        }
        console.log(showData)
        that.setData({
          saveData: res.result,
          showChoose: showData,
        })
      }
    })
  },
  link(e){
    console.log(e)
    var src = e.currentTarget.dataset.src
    var index = this.data.selectIndex
    var patId = this.data.saveData[index].patientID
    console.log(patId)
    wx.navigateTo({
      url: src + "?patid=" + patId ,
    })
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  onGetShow: function (e) {
    console.log(e.detail)
    this.data.selectIndex = e.detail
  },
  linkToMin(){
    wx.navigateToMiniProgram({
      appId: 'wxea7a2c3c88e3ad65',
      path: 'pages/index/index',
      envVersion: 'trial',
      success(res) {
        console.log(res)
      }
    })
  }
})