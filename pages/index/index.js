//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ['foo', 'bar'],
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    introduces:[
      { "title": "公卫简介","url":"../introduce/introduce","id":"1"},
      { "title": "就医指南", "url": "../introduce/introduce", "id": "2"},
      { "title": "来院路线", "url": "../introduce/introduce", "id": "3"},
      { "title": "院内导航", "url": "../introduce/introduce", "id": "4"}
    ],
    mainNavs:[
      { 'word': '预约挂号', "color":"rgba(24, 179, 151, 1)","url":"../book/books"},
      { 'word': '诊间付费', "color": "#FF9800 100%", "url": "../book/books"},
      { 'word': '预约挂号', "color": "rgba(24, 179, 151, 1)", "url": "../book/books"},
      { 'word': '诊间付费', "color": "#FF9800 100%", "url": "../book/books"},
      { 'word': '预约挂号', "color": "rgba(24, 179, 151, 1)", "url": "../book/books"},
      { 'word': '诊间付费', "color": "#FF9800 100%", "url": "../book/books"},
      { 'word': '预约挂号', "color": "rgba(24, 179, 151, 1)", "url": "../book/books"},
      { 'word': '诊间付费', "color": "#FF9800 100%", "url": "../book/books"}
    ],
    imgUrls: [
      'https://p3.pstatp.com/large/43700001e49d85d3ab52',

      'https://p3.pstatp.com/large/39f600038907bf3b9c96',

      'https://p3.pstatp.com/large/31fa0003ed7228adf421'

    ],

    links: [
      '../user/user',

      '../user/user',

      '../user/user'
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })

  },

  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
  },
  onPageScroll: function (res) {
    if (res.scrollTop >= 166) {
      this.setData({ loading: true })
    }
   },
  changeloading:function(){
      wx.pageScrollTo({
        scrollTop: 166
      }),
        this.setData({
          loading: false
        })
  }
})
