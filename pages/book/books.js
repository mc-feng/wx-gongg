const app = getApp()
Page({
  data: {
    content: [{ "title": "金山总部", "leve": "三级甲等", "place": "上海市金山区嘈廊公路2901号","hospitalID":"02"}, 
      { "title": "市区分部", "leve": "三级甲等", "place": "上海市虹口区同心路921号", "hospitalID": "01"}],
    result:"",
    bindCard:"",
    noBind:"",
    arr:[],
    distance: [],
    loading:true
  },
  onLoad: function (options) {
    this.getDistance(getApp().globalData.latitude, getApp().globalData.longitude, 30.7898400000, 121.3400100000)
    this.getDistance(getApp().globalData.latitude, getApp().globalData.longitude, 31.2739100000, 121.4703200000)
    console.log(this.data.distance)
    console.log('latitude的值是：' + getApp().globalData.latitude)
    console.log('longitude的值是：' + getApp().globalData.longitude)
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/common/checkdata',
      method: "post",
      data: {
        "hospitalID": app.globalData.openId
      },
      success: function (res) {
        that.setData({
          loading:false
        })
        //判断绑卡操作
        if (res.data.result== 1){
          that.setData({
            result: false
          })
        } else if (res.data.result == 2){
          that.setData({
            result: true,
            bindCard:false
          })
        } else if (res.data.result == 3){
          that.setData({
            result: true,
            bindCard: true
          })
        } else if (res.data.result == 4){
          that.setData({
            result: true,
            bindCard: false,
            noBind :true
          })
        }
      }
    })
  },
  linkToDepartments:function(e){
    console.log(e)
    let str = JSON.stringify(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../bookdepartments/bookdepartments?data=' + str,
    })
  },
  getDistance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000
    s = s.toFixed(2)
    this.data.arr.push(s)
    this.setData({
      distance: this.data.arr
    })
  },
  LinkToPeople:function(e){
   wx.navigateTo({
     url: '../editPeopleMess/editPeopleMess',
   })
  },
  LinkToCard:function(e){
    wx.navigateTo({
      url: '../managePatient/managePatient',
    })
  },
  onShow() { 
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/common/checkdata',
      method: "post",
      data: {
        "hospitalID": app.globalData.openId
      },
      success: function (res) {
        that.setData({
          loading: false
        })
        console.log(res)
        //判断绑卡操作
        if (res.data.result == 1) {
          that.setData({
            result: false,
            noBind: false
          })
        } else if (res.data.result == 2) {
          that.setData({
            result: true,
            bindCard: false,
            noBind: false
          })
        } else if (res.data.result == 3) {
          that.setData({
            result: true,
            bindCard: true,
            noBind: false
          })
        } else if (res.data.result == 4) {
          that.setData({
            result: true,
            bindCard: false,
            noBind: true
          })
        }
      }
    })
  }
})
