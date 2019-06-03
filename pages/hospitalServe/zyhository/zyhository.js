// pages/hospitalServe/zyhository/zyhository.js
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
     wx.showLoading()
     var patId = options.patid
     var that = this
     wx.request({
       url: '/hospitalization/getZyjlPat',
       method:"post",
       data:{
         patientID: patId,
         suoshu:"0"
       },
       success(res){
         wx.hideLoading()
         console.log(res)
         if(res.result){
           that.setData({
             result: res.result.zyjls,
             show: res.success,
             patId
           })
         }else{
           that.setData({
             show: res.success
           })
         }
       },
       complete(){
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

  },
  link(e){
    var patientID = this.data.patId
    var data = e.currentTarget.dataset
    console.log(data)
    var transJs = JSON.stringify(data)
    wx.navigateTo({
      url: '../zyDetail/zyDetail?transDate=' + transJs,
    })
  }
})