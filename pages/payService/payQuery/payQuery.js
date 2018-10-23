// pages/payService/payQuery/payQuery.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorResult:[],
    parameter: [{},{}],
    showChoose: ["李丽丽  123456y123456y", "王二丫  123456y123456y", "赵思思  123456y123456y", "钱多度  123456y123456y"],
    index: "1",
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result = [];
    var arr = [{ "color": "#D2EAFF", "font": "#0D86EB" }, { "color": "#FFEFD3", "font": "#FD9611" }, { "color": "#D3F4EC", "font": "#00B277" }];
    for (var i = 0; i < 6; i++) {
      var index = i%3;
      result[i] = arr[index];
    }
    this.setData({
      colorResult :result
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
  //选择就诊人
  bindPickerChange: function (e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
  }
})