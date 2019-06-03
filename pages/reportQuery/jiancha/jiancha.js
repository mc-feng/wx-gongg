// pages/reportQuery/jiancha/jiancha.js
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
    console.log(JSON.parse(options.trans))
    console.log(options.bglbmc)
    var reportName = options.bglbmc
    var acceptData = JSON.parse(options.trans)
    this.setData({
      reportName: reportName
    })
    wx.showLoading({
      title: '加载数据',
    })
    wx.request({
      url: '/report/getLisDetail',
      method: "post",
      data: acceptData,
      success: function (res) {
        console.log(res)
        var reportContent = res.result.risResults
        reportContent.map((item)=>{
          for (var i in item){
            if (item[i]==""){
              item[i] = "暂无"
            }
          }
        })
        that.setData({
          reportContent: reportContent
        })
      },
      complete: function () {
        wx.hideLoading()
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

  }
})