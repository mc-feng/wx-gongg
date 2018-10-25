// pages/reportQuery/xueReport/xueReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   change:false,
   reportResult:[],
   loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(JSON.parse(options.transDetailData))
    var reportDetails = JSON.parse(options.transDetailData);
    wx.request({
      url: '/report/getjianyanreportdetail',
      method:"post",
      data:{
        accessToken: reportDetails.accessToken,
        openUserID: reportDetails.patientID,
        reportNo: reportDetails.reportNo,
        reportReadStatus:"0"
      },
      success:function(res){
        console.log(res)
        that.setData({
          reportResult: res.result,
          reportName: reportDetails.reportName,
          loading:false
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
  expand: function () {
    this.setData({
      change: !this.data.change
    })
  },
})