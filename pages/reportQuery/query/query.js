// pages/reportQuery/query/query.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: [],
    choose: [{}, {}],
    show: [],
    showChoose: [],
    index: "0",
    loading: true,
    result: true,
    bindCard: true,
    noBind: true,
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
      url: '/common/checkdata',
      method: "post",
      data: {
        "hospitalID": app.globalData.openId
      },
      success: function (res) {
        //判断绑卡操作
        if (res.result == 1) {
          wx.request({
            url: '/medicalcard/getweachattopatient',
            method: "post",
            data: {
              "openId": app.globalData.openId
            },
            success: function (res) {
              var showData = [];
              for (var i = 0; i < res.result.length; i++) {
                showData.push(res.result[i].openUserName + " " + res.result[i].createTime)
              }
              console.log(showData)
              console.log(res)
              that.setData({
                saveData: res.result,
                showChoose: showData,
                result: false,
                loading: false,
                noBind: true,
                bindCard: true,
              })
            }
          })
        } else if (res.result == 2) {
          that.setData({
            loading: false,
            result: true,
            bindCard: false,
            noBind: true
          })
        } else if (res.result == 3) {
          that.setData({
            loading: false,
            result: true,
            bindCard: true,
            noBind: false
          })
        } else if (res.result == 4) {
          that.setData({
            loading: false,
            result: true,
            bindCard: false,
            noBind: false
          })
        }
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
  //选择就诊人
  bindPickerChange: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      index: e.detail.value,
      headerName: false
    })
  },
  linkToReport:function(res){
    var index = this.data.index
    console.log(index)
    var transData = {
      accessToken : this.data.saveData[index].idCard,
      patientID: this.data.saveData[index].patientID,
      name: this.data.showChoose[index]
    }
    transData = JSON.stringify(transData)
    wx.navigateTo({
      url: '../../reportQuery/reportCard/reportCard?transData=' + transData 
    })
  },
  LinkToPeople: function (e) {
    wx.navigateTo({
      url: '../editPeopleMess/editPeopleMess',
    })
  },
  LinkToCard: function (e) {
    wx.navigateTo({
      url: '../managePatient/managePatient?card=bing',
    })
  }
})