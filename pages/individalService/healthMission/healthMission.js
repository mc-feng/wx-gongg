// pages/healthMission/healthMission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataContent:[],
    lei:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
   wx.request({
     url: 'http://192.168.2.165:8081/medicalcard/selectphototext',
     method:"post",
     data:{
       "id":"",
       "type":this.data.lei
     },
     success:function(res){
       console.log(res)
       that.setData({
         dataContent: res.data.result
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
  linkToContent: function (e) {
    console.log(e.currentTarget.dataset.id)
    var str = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../messageContent/messageContent?id=' + str + "&lei=" + this.data.lei,
    })
  }
})