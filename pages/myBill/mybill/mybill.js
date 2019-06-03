// pages/myBill/mybill/mybill.js
const app = getApp();
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
    var that = this
    wx.showLoading()
    //获取账单列表
    wx.request({
      url: '/outpatienttrade/getuserlist',
      method:"post",
      data:{
        openUserID: app.globalData.openId
      },
      success(res){
        console.log(res)
        that.setData({
          reslut: res.result.outPatientChargedOrderList
        })
      },
      complete(){
        wx.hideLoading()
      }
    })
  },
  linkDetail(e){
    console.log(e.currentTarget.dataset)
    var transData = JSON.stringify(e.currentTarget.dataset) 
    wx.navigateTo({
      url: '../billDetail/billDetail?trans=' + transData,
    })
  }
})