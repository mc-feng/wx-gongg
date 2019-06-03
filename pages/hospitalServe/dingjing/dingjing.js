// pages/hospitalServe/dingjing/dingjing.js
var util = require('../../../utils/util.js');
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
    console.log(options)
    var that = this
    var patientID = options.patid
    wx.request({
      url: '/hospitalization/getZyyjjmx',
      method:"post",
      data:{
        patientID
      },
      success(res){
        console.log(res)
        if (res.result){
          that.setData({
            result: res.result.zyyjjmxs
          })
        }else{
          that.setData({
            result: null
          })
        }  
      }
    })
    // 获取当前时间的时间戳
    // var timestamp = Date.parse(new Date());
    // var that = this
    // timestamp = timestamp / 1000;
    // //减七天的时间戳
    // var tomorrow_timetamp = timestamp - 24 * 60 * 60 * 7;
    // var n_to = tomorrow_timetamp;
    // var nextTime = util.formatTimeTwo(n_to, "Y-M-D");
    // var nowTime = util.formatTimeTwo(timestamp, "Y-M-D");
    // console.log(nextTime)
    // this.setData({
    //   nowTime: nowTime,
    //   date: nextTime,
    //   date2: nowTime
    // })
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