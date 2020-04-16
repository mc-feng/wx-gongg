// pages/zhiNeng/index/index.js
const app = getApp();
var interval;//循环获取数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChoose:[],//展示就诊人列表数组
    dataArr: [{ imgUrl: "../../../images/zhineng/tiwen.png", font: "体温", data: "--", dianLiang: "--", errState: false, errMessage: "" }, { imgUrl: "../../../images/zhineng/xinlv.png", font: "心率", data: "--", dianLiang: "--", errState: false, errMessage: "" }, { imgUrl: "../../../images/zhineng/huxilv.png", font: "呼吸率", data: "--", dianLiang: "--", errState: false, errMessage: ""}],
    selectIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onGetShow: function (e) {//选择就诊人并重新获取数据
    console.log(e.detail)
    this.data.selectIndex = e.detail
    this.data.patId = this.data.saveData[e.detail].patId
    this.getData();
  },
  getData(){//获取温度数据
    if (this.data.patId){
      var that = this;
      wx.request({
        url: '/hospitalization/monitor',
        method: "post",
        data: {
          caseNum: this.data.patId
        },
        success(res) {
          console.log(res)
          if (res.success) {
            var data = res.data
            that.dataProcessing(data)
          }else{
            wx.showToast({
              title: res.message,
              icon:"none"
            })
          }
        }
      })
    }else{//如果没有住院号处理方法
      wx.showToast({
        title: '未检测到住院号',
        icon:"none"
      })
      var initDataArr = [{ imgUrl: "../../../images/zhineng/tiwen.png", font: "体温", data: "--", dianLiang: "--", errState: false, errMessage: "" }, { imgUrl: "../../../images/zhineng/xinlv.png", font: "心率", data: "--", dianLiang: "--", errState: false, errMessage: "" }, { imgUrl: "../../../images/zhineng/huxilv.png", font: "呼吸率", data: "--", dianLiang: "--", errState: false, errMessage: "" }]
      this.setData({
        dataArr: initDataArr
      })
    }
  },
  dataProcessing(message){//处理数据
    var data = this.data.dataArr
    console.log(data)
    if ((message.heartRateStatus == 1) || (message.heartRateStatus == 0)) {//心率
      data[1].dianLiang ="--"
      data[1].data = "--"
      data[1].heartRateStatus = message.heartRateStatus
    }else{
      data[1].dianLiang = message.healthPattery + "%"
      data[1].data = message.heartRate + "次/分"
      data[1].heartRateStatus = message.heartRateStatus
    }
    if ((message.respiratoryRateStatus == 1) || (message.respiratoryRateStatus == 0)){//呼吸率
      data[2].dianLiang = "--"
      data[2].data = "--"
      data[2].respiratoryRateStatus = message.respiratoryRateStatus
    }else{
      data[2].dianLiang = message.healthPattery + "%"
      data[2].data = message.respiratoryRate + "次/分"
      data[2].respiratoryRateStatus = message.respiratoryRateStatus
    }
    if ((message.temperatureStatus == 3) || (message.temperatureStatus == 4) || (message.temperatureStatus == 6)){//温度
      data[0].data = "--"
      data[0].dianLiang =  "--"
      data[0].temperatureStatus = message.temperatureStatus
    }else{
      data[0].data = message.temperature + "℃"
      data[0].dianLiang = message.temperaturePattery + "%"
      data[0].temperatureStatus = message.temperatureStatus
    }
    if (message.temperatureStatus > 0){//体温数据异常状态判断
      data[0].errState = true
      if (message.temperatureStatus==1){
        data[0].errMessage = "低温"
      } else if (message.temperatureStatus == 2){
        data[0].errMessage = "高温"
      } else if (message.temperatureStatus == 3) {
        data[0].errMessage = "连接异常"
      } else if (message.temperatureStatus == 4) {
        data[0].errMessage = "请确认是否佩戴"
      } else if (message.temperatureStatus == 5) {
        data[0].errMessage = "未按规范佩戴"
      } else if (message.temperatureStatus == 6) {
        data[0].errMessage = "未使用"
      }else{
        data[0].errMessage = "异常情况"
      }
    }else{
      data[0].errState = false
    }
    if (message.heartRateStatus !=2) {//心率数据异常状态判断
      data[1].errState = true
      if (message.heartRateStatus == 0) {
        data[1].errMessage = "未使用"
      } else if (message.heartRateStatus == 1) {
        data[1].errMessage = "连接异常"
      } else if (message.heartRateStatus == 3) {
        data[1].errMessage = "心率异常"
      } 
    } else {
      data[1].errState = false
    }
    if (message.respiratoryRateStatus != 2) {//呼吸率数据异常状态判断
       data[2].errState = true
      if (message.respiratoryRateStatus == 0) {
        data[2].errMessage = "未使用"
      } else if (message.respiratoryRateStatus == 1) {
        data[2].errMessage = "连接异常"
      } else if (message.respiratoryRateStatus == 3) {
        data[2].errMessage = "呼吸率异常"
      }
    } else {
      data[2].errState = false
    }
    this.setData({
      dataArr:data
    })
  },
  linke(e){//连接数据
    console.log(e.currentTarget.dataset.font)
    if(this.data.patId){
      var type = e.currentTarget.dataset.font
      if (type == "体温") {
        wx.navigateTo({
          url: '../tiwen/tiwen?patId=' + this.data.patId,
        })
      } else if ((type == "心率") || (type == "呼吸率")) {
        wx.showToast({
          title: '功能开发中',
          icon:"none"
        })
        // wx.navigateTo({
        //   url: '../xinlv/xinlv?patId=' + this.data.patId,
        // })
      } 
    }else{
      wx.showToast({
        title: '未检测到住院号',
        icon: "none"
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
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
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
          showChoose: showData,
          saveData: res.result,
          patId: res.result[that.data.selectIndex].patId
        })
        that.getData();
      },
      complete() {
        wx.hideLoading()
      }
    })
    clearInterval(interval);
    interval = setInterval(that.getData, 60000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(interval);
    console.log("隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("隐藏")
    clearInterval(interval);
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