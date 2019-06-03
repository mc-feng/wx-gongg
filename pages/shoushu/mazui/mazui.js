// pages/shoushu/mazui/mazui.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    font:32,
    font2:28
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.innerAudioContext = wx.createInnerAudioContext();
    that.innerAudioContext.autoplay = true;
    that.innerAudioContext.loop = true;
    wx.request({
      url: '/hospitalization/getSpeech',
      data: {
        bgdh: '麻醉分为全身麻醉，半身麻醉和局部麻醉。麻醉分为全身麻醉，半身麻醉和局部麻醉。麻醉分为全身麻醉，半身麻醉和局部麻醉',
        openID: app.globalData.openId,
      },
      method: 'POST',
      success(res) {
        console.log(res)
        let data = res.result;
        that.innerAudioContext.src = data + '?rnd=' + new Date().getTime();
        that.innerAudioContext.onPlay(()=> {
          console.log('开始播放啦');
        });
        that.innerAudioContext.onError((res)=> {
          console.log(res.errMsg) ;
          console.log(res.errCode)
        });
      },
      fail(err) {
        console.log(err)
      }
    });
  },
  changefont(e){
    console.log(e.detail.value)
    var value = e.detail.value
    var font = 32 + value
    var font2 = 28 + value
    this.setData({
      font,
      font2
    })
  }
})