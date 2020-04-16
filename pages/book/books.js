const app = getApp()
Page({
  data: {
    content: [{ "title": "金山院区", "leve": "三级甲等", "place": "上海市金山区嘈廊公路2901号", "hospitalID":"Y0041800100"}, 
      { "title": "虹口院区", "leve": "三级甲等", "place": "上海市虹口区同心路921号", "hospitalID": "42500982800"}],
    result:true,
    bindCard:true,
    noBind:true,
    arr:[],
    distance: [],
    loading:true,
    showModalStatus: false
  },
  onLoad: function (options) {
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
    if (this.data.arr.length>=2){
      this.data.arr.push(s)
      this.data.arr.splice(0,1)
    }else{
      this.data.arr.push(s)
    }
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
      url: '../managePatient/managePatient?card=bing',
    })
  },
  onShow:function(){ 
    var that = this
    that.setData({
      showModalStatus: false
    })
    wx.request({
      url: '/common/checkdata',
      method: "post",
      data: {
        "hospitalID": app.globalData.openId
      },
      success: function (res) {
        console.log(res.result)
        //判断绑卡操作
        if (res.result == 1) {
          that.setData({
            loading: false,
            result: false,
            noBind: true,
            bindCard: true,
          })
        } else if (res.result == 2) {
          that.setData({
            loading: false,
            result: true,
            bindCard: false,
            noBind: true
          })
        } else if (res.result == 3) {
          that.setData({
            loading: false,
            result: true,
            bindCard: true,
            noBind: false
          })
        } else if (res.result == 4) {
          that.setData({
            loading: false,
            result: true,
            bindCard: false,
            noBind: false
          })
        }
      }
    });
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
          that.setData({
            showModalStatus: true
          })
        }else{
          wx.getLocation({
            success: function (res) {
              if (res != undefined && res != null) {
                //保存用户的当前经纬度
                app.globalData.latitude = res.latitude,
                app.globalData.longitude = res.longitude,
                that.getDistance(app.globalData.latitude, app.globalData.longitude, 30.7898400000, 121.3400100000)
                that.getDistance(app.globalData.latitude, app.globalData.longitude, 31.2739100000, 121.4703200000)
                console.log(that.data.distance)
              };
            },
          })
        }
      }
    });
  },
  onReady:function(){
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})
