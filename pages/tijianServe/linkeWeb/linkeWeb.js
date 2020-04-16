// pages/tijianServe/linkeWeb/linkeWeb.js
Page({
  data: {
    src:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.str))
    var transData = JSON.parse(options.str)
    var src = " https://wechat.medbot.top/wechat_all/index.html?module=medicalReport&phone=" + transData.zsTel + "&sfzh=" + transData.zsIdCard+"&orgId=12"
    this.setData({
        src
    })
    console.log(this.data.src)
  },
})
