// pages/messageContent/messageContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
   let that = this
   wx.request({
     url: 'http://192.168.2.165:8081/medicalcard/selectphototext',
     method:"post",
     data:{
       "id": options.id,
       "type": options.lei
     },
     success:function(res){
       console.log(res.result)
       res.result[0].text = res.result[0].text.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
       that.setData({
         content: res.result[0]
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
  
  }
})