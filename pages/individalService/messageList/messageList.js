// pages/messageList/messageList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataFirst:{},
    dataContent:[],
    lei:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that =this
   wx.request({
     url: '/medicalcard/selectphototext',
     method:"post",
     data: {
       "id": "",
       "type": this.data.lei
     },
     success:function(res){
       var object1 = res.result.shift()
       console.log(object1)
       console.log(res.result)
       that.setData({
         dataFirst: object1,
         dataContent: res.result
       })
       console.log(res)
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
  linkToContent:function(e){
    console.log(e.currentTarget.dataset.id)
    var str = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../messageContent/messageContent?id='+str+"&lei="+this.data.lei,
    })
  }
})