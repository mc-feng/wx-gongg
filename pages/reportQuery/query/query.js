// pages/reportQuery/query/query.js
const app = getApp();
var util = require('../../../utils/util.js');
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
    date:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间的时间戳
    var timestamp = Date.parse(new Date());
    var that = this
    timestamp = timestamp / 1000;
    //减七天的时间戳
    var tomorrow_timetamp = timestamp - 24 * 60 * 60*7;
    var n_to = tomorrow_timetamp;
    var nextTime = util.formatTimeTwo(n_to, "Y-M-D");
    var nowTime = util.formatTimeTwo(timestamp, "Y-M-D");
    console.log(nextTime)
    this.setData({
      nowTime: nowTime,
      date: nextTime,
      date2: nowTime
    })
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
        that.setData({
          saveData: res.result,
          showChoose: showData,
        })
        that.getReprtList(that.data.date, that.data.nowTime, that)
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
  //选择就诊人
  bindPickerChange: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      index: e.detail.value
    })
    that.getReprtList(that.data.date, that.data.nowTime, that)
  },
  //选择开始日期
  bindDateChange(e) {
    console.log(e.detail.value)
    var startDate = e.detail.value
    this.getReprtList(startDate, this.data.date2, this)
    this.setData({
      date: startDate
    })
  },
  bindDateChange2(e) {
    var endDate = e.detail.value
    this.setData({
      date2: endDate
    })
    this.getReprtList(this.data.date, endDate, this)
  },
  //随机颜色
  randomColor(now) {
    var that = now
    var result = [];
    var length = this.data.reportArr.length
    var arr = [{ "color": "#2081F2"}, { "color": "#20D489"}, { "color": "#FFBA00"}];
    for (var i = 0; i < length; i++) {
      var index = i % 3;
      result[i] = arr[index];
    }
    that.setData({
      colorResult: result
    })
  },
  //获取数据列表
  getReprtList:function(stratTime,endTime,that){
    var sendEndTime = endTime.replace(/-/g, "")
    var sedStartTime = stratTime.replace(/-/g, "")
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '/report/getLisList',
      method: "post",
      data: {
        patientID: that.data.saveData[that.data.index].patientID,
        startTime: sedStartTime,
        endTime: sendEndTime
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        var reslut = res.result
        reslut.map((item) => {
          item.bgfbsj = item.bgfbsj.substr(0, 4) + "-" + item.bgfbsj.substr(4, 2) + "-" + item.bgfbsj.substr(6, 2)
        })
        that.setData({
          reportArr: reslut
        })
        that.randomColor(that)
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  },
  linkToContent:function(res){
    console.log(res)
    var dataSet = res.currentTarget.dataset
    var openData = { suoshu: dataSet.suoshu, bgdh: dataSet.bgdh, bglbdm: dataSet.bglbdm}
    var bglbmc = dataSet.bglbmc
    var trans = JSON.stringify(openData)
    if (dataSet.suoshu=="jianyan"){
      wx.navigateTo({
        url: '../jianyan/jianyan?trans=' + trans + '&&bglbmc=' + bglbmc,
      })
    } else if (dataSet.suoshu == "jiancha"){
      wx.navigateTo({
        url: '../jiancha/jiancha?trans=' + trans + '&&bglbmc=' + bglbmc,
      })
    }
  }
})