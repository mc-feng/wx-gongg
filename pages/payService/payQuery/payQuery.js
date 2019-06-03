// pages/payService/payQuery/payQuery.js
const app = getApp();
const promisify = name => option =>
  new Promise((resolve, reject) =>
    wx[name]({
      ...option,
      success: resolve,
      fail: reject,
    })
  );
const requestPayment = promisify('requestPayment')
const request = promisify('request')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorResult:[],
    parameter: [{}],//就诊列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openId)
    var hospitalToken = options.hospitalToken;
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '/outpatienttrade/getoutpatientunchargetradelist',
      method: "post",
      data: { 
        "accessToken": hospitalToken, 
        "openUserID": app.globalData.openId
      },
      success:function(res){
        wx.hideLoading()
        console.log(res)
        if (!res.result.outPatientUnchargedOrderList){
          res.result.outPatientUnchargedOrderList = []
        }
        that.setData({
          parameter: res.result.outPatientUnchargedOrderList,
          hospitalToken: hospitalToken
        })
        that.randomColor(that)
      },
      fail:function(res){
        wx.hideLoading()
        that.setData({
          parameter: []
        })
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
  //随机颜色
  randomColor(now){
    var that = now
    var result = [];
    var length = this.data.parameter.length
    var arr = [{ "color": "#3B98F7 1%, #68D1FF 100%", "font": "#ffffff" }, { "color": "#D778F9 0%, #568AEE 98%", "font": "#ffffff" }, { "color": "#FFA27B 6%, #FF4992 98%", "font": "#ffffff" }];
    for (var i = 0; i < length; i++) {
      var index = i % 3;
      result[i] = arr[index];
    }
    that.setData({
      colorResult: result
    })
  },
  //付款
  payMoney:function(res){
    console.log(res.currentTarget.dataset.index)
    var index = res.currentTarget.dataset.index
    var that = this
    console.log(this.data.parameter[index].outPatientNumber)
    wx.showLoading({
      title: '支付连接中',
    });
    request({
      url: '/outpatienttrade/getoutpatientunchargetradedetail',
      method: "post",
      data: {
        "accessToken": that.data.hospitalToken,
        "openUserID": app.globalData.openId,
        "outPatientNumber": that.data.parameter[index].outPatientNumber
      },
    }).then((res) =>{
      wx.hideLoading()
      console.log(res)
      var timeStamp = res.result.wx_pay_data.timeStamp
      var nonceStr = res.result.wx_pay_data.nonceStr
      var packages = res.result.wx_pay_data.prepayId
      var signType = res.result.wx_pay_data.signType
      var paySign = res.result.wx_pay_data.paySign
      that.setData({
        uuid: res.result.uuid
      })
      return requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: packages,
        signType: signType,
        paySign: paySign,
      })
    }).then((res) => {
      console.log(res)
      if(res.errMsg == 'requestPayment:ok') {
        wx.request({
          url: '/outpatienttrade/IFUpdateTradeStatus',
          method:"post",
          data:{
            accessToken: that.data.hospitalToken,
            notifyParams: that.data.uuid
          },
          success(res){
            console.log(res)
          }
        })
        wx.navigateBack({
          delta: 3
        })
      }
    }).catch((res)=>{
      if (res.errMsg == "requestPayment:fail cancel") {
        console.log(that.data.uuid)
      } else {
        wx.showToast({
          title: '支付失败，请重新支付',
          icon: "none"
        })
      }
    })
    // wx.request({
    //       url: '/outpatienttrade/getoutpatientunchargetradedetail',
    //       method: "post",
    //       data: {
    //         "accessToken": that.data.hospitalToken,
    //         "openUserID": app.globalData.openId,
    //         "outPatientNumber": that.data.parameter[index].outPatientNumber
    //       },
    //       success:function(res){
    //         wx.hideLoading()
    //         console.log(res)
    //         var timeStamp = res.result.wx_pay_data.timeStamp
    //         var nonceStr = res.result.wx_pay_data.nonceStr
    //         var packages = res.result.wx_pay_data.prepayId
    //         var signType = res.result.wx_pay_data.signType
    //         var paySign = res.result.wx_pay_data.paySign
    //         wx.requestPayment({
    //           timeStamp: timeStamp,
    //           nonceStr: nonceStr,
    //           package: packages,
    //           signType: signType,
    //           paySign: paySign,
    //           success:function(res){
    //             console.log(res)
    //             if (res.errMsg == 'requestPayment:ok') {
    //               wx.navigateBack({
    //                 delta: 3
    //               })
    //             }
    //           },
    //           fail:function(res){
    //             console.log(res)
    //             if (res.errMsg == "requestPayment:fail cancel"){
    //             }else{
    //               wx.showToast({
    //                 title: '支付失败，请重新支付',
    //                 icon:"none"
    //               })
    //             }
    //           }
    //         })
    //       }
    //     })
  }
})