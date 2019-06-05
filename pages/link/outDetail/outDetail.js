// pages/link/outDetail/outDetail.js
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
    console.log(decodeURIComponent(options.id))
    console.log(options.msg)
    var id = decodeURIComponent(options.id)
    var type = options.msg
    var value = options.value
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '/common/detailAnon',
      method: "post",
      data: {
        httpCode:id ,
        msg: type 
      },
      success: function (res) {
        console.log(res)
        var result = res.result.data.detail
        result.map((item)=>{
          if (item.content){
            item.content = item.content.replace(/[\r\n][\r\n]/g, "<br/>")
            item.content = that.formatRichText(item.content)
          }else{
            item.content = "暂无"
          }
        })
        console.log(result)
        that.setData({
          result: result,
          value,
          type
        })
      },
      complete:function(){
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
  // 转化图片
  formatRichText:function(html){
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
      match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin-top:0;margin-bottom:10px;"');
    return newContent;
  }
})