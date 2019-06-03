// pages/myBill/billDetail/billDetail.js
const app = getApp()
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
    var trans = JSON.parse(options.trans);
    var that = this
    console.log(trans)
    // 获取详情
    wx.request({
      url: '/outpatienttrade/getoutpatientchargedtradedetail',
      method:"post",
      data:{
        outTradeNo: trans.outtradeno,
        openUserID:app.globalData.openId,
        accessToken: trans.yuanqu
      },
      success(res){
        console.log(res)
        that.setData({
          reslut: res.result.outPatientSubItemList
        })
      }
    })
  },
})