//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    msgList: [],
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
      { 'word': '排队叫号', "url": "../link/lock/lock?str=排队叫号", "src": "../../images/homeimages/jiaohao.png"},
      { 'word': '咨询医生', "url": "../link/consultDoctor/consultDoctor", "src": "../../images/homeimages/yisheng@2x.png" },
      { 'word': '报告查询', "url": "../link/lock/lock?str=报告查询", "src": "../../images/homeimages/baogao@2x.png"},
      { 'word': '诊间付费', "url": "../link/lock/lock?str=诊间付费", "src": "../../images/homeimages/fufei@2x.png"},
      { 'word': '住院服务', "url": "../link/lock/lock?str=住院服务", "src": "../../images/homeimages/zhuyuan@2x.png"},
      { 'word': '手术方案', "url": "../link/lock/lock?str=手术方案", "src": "../../images/homeimages/shoushu@2x.png"},
      { 'word': '体检服务', "url": "../tips/tips", "src": "../../images/homeimages/tijian@2x.png"}
    ],
    imgUrls: [],
    newList:[]
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
  onShow(){
    //防止网络延迟获取不到openid
    var that = this
    setTimeout(res,1000)
    function res(){
      if (!app.globalData.openId) {
        wx.login({
          success: res => {
            console.log(res.code)
            wx.request({
              url: '/medicalcard/getopenid',
              method: "post",
              data: {
                "openId": res.code
              },
              success: function (res) {
                console.log("openid获取失败重新获取")
                var openId = res.result
                console.log(openId)
                app.globalData.openId = openId
              }
            })
          }
        })
      } else {
        console.log("已经获取")
      }
    }
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
      url: "../messageContent/messageContent?id=" + str + "&lei=" +0
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
   },
  onReachBottom: function () {
  },
  //页面分享
  onShareAppMessage: function (res) {
    return {
      title: '上海公共卫生临床中心',
      path: '/pages/index/index',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
})
