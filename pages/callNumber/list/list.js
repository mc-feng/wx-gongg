// pages/callNumber/list/list.js
const app = getApp();
Page({
  data:{
    index:0, // 默认选择用户
    show:[] //所要展示的用户
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '查询中',
    })
    var that = this
    wx.request({
      url: '/medicalcard/getweachattopatient',
      data: {
        "openId": app.globalData.openId//openID
      },
      method: "post",
      success: function (res) {
        console.log(res)
        var choose = res.result
        that.setData({
          choose: res.result
        })
        that.callRequest(that)
        //设置选择的患者
        for (var i = 0; i < res.result.length; i++) {
          that.data.show.push("就诊人: " + res.result[i].openUserName + "  " + "卡号: " + res.result[i].createTime)
        }
        //保留当前就诊人
        var callIndex = app.globalData.callIndex ? app.globalData.callIndex : that.data.index
        that.setData({
          showChoose: that.data.show,
          index: callIndex
        })
        console.log(that.data.showChoose)
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  onShow:function(){
    var that = this
    if (that.data.choose){
      that.callRequest(that)
    }
  },
  // 点击切换头像
  bindPickerChange: function (e) {
    var that = this;
    app.globalData.callIndex = e.detail.value
    console.log(app.globalData.callIndex)
    that.setData({
      index: e.detail.value
    })
    that.callRequest(that)
    console.log(this.data.choose[e.detail.value].patientID)
  },
  //刷新排队叫号请求
  callRequest:function(that){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '/sign/getMzpdPat',
      method: "post",
      data: {
        dataSource: that.data.choose[that.data.index].patientID
      },
      success: function (res) {
        wx.hideLoading()
        if (res.success) {
          that.setData({
            callContent: res.result.mzpds
          })
        } else {
          that.setData({
            callContent: []
          })
        }
        console.log(res)
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  }
})