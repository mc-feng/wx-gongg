//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    msgList: [],
    list:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ['foo', 'bar'],
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 800,
    circular: true,
    introduces:[
      { "title": "公卫简介","url":"../introduce/introduce","id":"1", "src":"../../images/homeimages/jianjie@2x.png"},
      { "title": "来院路线", "url": "../ways/ways", "id": "2", "src": "../../images/homeimages/luxian@2x.png"},
      { "title": "就医指南", "url": "../docterDirect/docterDirect", "id": "3", "src": "../../images/homeimages/zhidao@2x.png"},
      { "title": "院内导航", "url": "../inNavigation/inNavigation", "id": "4", "src": "../../images/homeimages/daohang@2x.png"}
    ],
    mainNavs:[
      { 'word': '预约挂号', "url": "../book/books", "src":"../../images/homeimages/guahao@2x.png"},
      { 'word': '排队叫号', "url": "../tips/tips", "src": "../../images/homeimages/jiaohao.png"},
      { 'word': '咨询医生', "url": "../expertConsultation/expertDetails/expertDetails", "src": "../../images/homeimages/yisheng@2x.png"},
      { 'word': '报告查询', "url": "../tologin/tologin", "src": "../../images/homeimages/baogao@2x.png"},
      { 'word': '诊间付费', "url": "../reportQuery/query/query", "src": "../../images/homeimages/fufei@2x.png"},
      { 'word': '住院预约', "url": "../tips/tips", "src": "../../images/homeimages/zhuyuan@2x.png"},
      { 'word': '手术方案', "url": "../tips/tips", "src": "../../images/homeimages/shoushu@2x.png"},
      { 'word': '体验服务', "url": "../tips/tips", "src": "../../images/homeimages/tijian@2x.png"}
    ],
    imgUrls: [],
    newList:[],
    links: [
      '../messageContent/messageContent?id=',

      '../messageContent/messageContent?id=',

      '../messageContent/messageContent?id='
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that =this;
     wx.request({
       url: '/medicalcard/selectphototext',
       method:"post",
       data: {
         "id": "",
         "type":0
       },
       success:function(res){
         console.log(res)
         that.setData({
           imgUrls: res.result
         })
       }
     })
    wx.request({
      url: '/medicalcard/selectphototext',
      method: "post",
      data: {
        "id": "",
        "type":3
      },
      success: function (res) {
        console.log(res)
        that.setData({
          msgList: res.result
        })
      }
    })
    wx.request({
      url: '/medicalcard/selectphototitle',
      method: "post",
      data: {
        "type":1,
        "id":1,
        "status":3
      },
      success: function (res) {
        console.log(res)
        that.setData({
          newList: res.result
        })
      }
    })
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    if(e.detail.source == "touch"){//判断是否由用户触摸导致
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(e.currentTarget.dataset.id);
    console.log(this.data.swiperCurrent);
    var str = e.currentTarget.dataset.id
    wx.navigateTo({
      url: this.data.links[this.data.swiperCurrent] + str + "&lei=" +0
    })
  },
  //点击公告触发时间
  noticeClick:function(e){
    var str = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../messageContent/messageContent?id=' + str + "&lei=" +3
    })
  },
  newsClick: function (e) {
    var str = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../messageContent/messageContent?id=' + str + "&lei=" + 1
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
