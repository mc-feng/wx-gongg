//logs.js
const app = getApp()
Page({
  data: {
    pagedata: [{ "image": "../../images/personimages/guahao@2x.png", "title": "预约记录" }, { "image": "../../images/personimages/baodan@2x.png", "title": "保单记录" }, { "image": "../../images/personimages/tiwen@2x.png", "title": "咨询记录" }, { "image": "../../images/personimages/jiaofei@2x.png", "title": "我的账单" }, { "image": "../../images/personimages/yijian@2x.png", "title": "意见反馈" }],
    userInfo :{}
  },
  onLoad: function () {
    console.log(2)
    //已获得用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)
  }
})
