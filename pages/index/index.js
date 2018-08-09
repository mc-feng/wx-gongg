//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
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
      { "title": "公卫简介","url":"../introduce/introduce","id":"1", "src":"../../images/homeimages/jianjie@2x.png"},
      { "title": "来院路线", "url": "../introduce/introduce", "id": "2", "src": "../../images/homeimages/luxian@2x.png"},
      { "title": "就医指南", "url": "../introduce/introduce", "id": "3", "src": "../../images/homeimages/zhidao@2x.png"},
      { "title": "院内导航", "url": "../introduce/introduce", "id": "4", "src": "../../images/homeimages/daohang@2x.png"}
    ],
    mainNavs:[
      { 'word': '预约挂号', "url": "../book/books", "src":"../../images/homeimages/guahao@2x.png"},
      { 'word': '诊间付费', "url": "../book/books", "src": "../../images/homeimages/fufei@2x.png"},
      { 'word': '咨询医生', "url": "../consult/consult", "src": "../../images/homeimages/yisheng@2x.png"},
      { 'word': '报告查询', "url": "../report/report", "src": "../../images/homeimages/baogao@2x.png"},
      { 'word': '住院预约', "url": "../inHospital/inHospital", "src": "../../images/homeimages/zhuyuan@2x.png"},
      { 'word': '手术方案', "url": "../book/books", "src": "../../images/homeimages/shoushu@2x.png"},
      { 'word': '体验服务', "url": "../book/books", "src": "../../images/homeimages/tijian@2x.png"},
      { 'word': '更多服务', "url": "../book/books", "src": "../../images/homeimages/gengduo@2x.png"}
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
    var that =this;
    //  wx.request({
    //    url: 'http://192.168.2.165:8081/photo/select',
    //    method:"get",
    //    success:function(res){
    //      that.setData({
    //        list: res.data.result
    //      })
    //      console.log(that.data.list)
    //    }
    //  })
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
