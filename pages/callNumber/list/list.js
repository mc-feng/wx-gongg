// pages/callNumber/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [{ "title": "心脑管内科门诊", "top": false, "number": "190位" }, { "title": "内科门诊", "top": false, "number": "1位" }, { "title": "外科门诊", "top": false, "number": "5位" }, { "title": "骨科门诊", "top": false, "number": "122位" }],
    timeCommit:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  changeTop:function(res){
    var index = res.currentTarget.dataset.index
    var neww = this.data.listArr.splice(index, 1)
    for (var i = 0; i < this.data.listArr.length;i++){
      this.data.listArr[i].top = false
    }
    neww[0].top = true
    this.data.listArr.unshift(neww[0])
    this.setData({
      listArr: this.data.listArr
    })
  }
})