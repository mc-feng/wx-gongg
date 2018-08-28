//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.authorize({
      scope:"scope.userLocation"
    })
    //设置权限
    // wx.openSetting({
    //   success: (res) => {
    //     console.log(res)
    //       res.authSetting = {
    //         "scope.userInfo": true,
    //         "scope.userLocation": true
    //       }
    //   }
    // })
    // 登录
    ,
    // wx.checkSession({
    //   success:function(e){
    //     console.log("没有过期")
    //   },
    //   fail:function(){
    //     console.log("过期了")
    //     wx.login({
    //       success: res => {
    //         console.log(res.code)
    //         wx.request({
    //           url: 'http://192.168.2.165:8081/medicalcard/getopenid',
    //           method: "post",
    //           data: {
    //             "openId": res.code
    //           },
    //           success: function (res) {
    //             console.log(10)
    //             console.log(res)
    //           }
    //         })
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userLocation']){
          var that = this
          wx.getLocation({
            success: function (res) {
              if (res != undefined && res != null) {
                //保存用户的当前经纬度
                  that.globalData.latitude=res.latitude,
                  that.globalData.longitude= res.longitude
              }
            },
          })
        }
        //获取游客头像和登录信息
        if (res.authSetting['scope.userInfo']) {
          let that = this
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              //保存用户信息和头像
              that.globalData.userInfo = res.userInfo
              //用户登录
              wx.login({
                success: res => {
                  console.log(res.code)
                  wx.request({
                    url: 'http://192.168.2.165:8081/medicalcard/getopenid',
                    method: "post",
                    data: {
                      "openId": res.code
                    },
                    success: function (res) {
                      console.log(res)
                      var openId = res.data.result
                      console.log(openId)
                      that.globalData.openId = openId
                      wx.request({
                        url: 'http://192.168.2.165:8081/common/getweachat',//获取游客记录
                        method: "post",
                        data: {
                          "hospitalID": openId,
                          "hospitalName": that.globalData.userInfo.nickName
                        },
                        success: function (res) {
                          console.log(res)
                        }
                      })
                    }
                  })
                }
              })
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = user
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    })
  },
  //定义一个全局变量
  globalData: {
    userInfo: {},
    latitude:"",
    longitude:"",
    openId:""
  }
})