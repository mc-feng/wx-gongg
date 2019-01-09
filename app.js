//app.js
var aldstat = require("./utils/ald-stat.js")
const wxApiInterceptors = require('./utils/wxApiInterceptors');
var Dec = require('./utils/public.js')
wxApiInterceptors()
wxApiInterceptors({
  request: {
    request(params) {
      const host = 'https://www.tonticn.cn:8081'
      if (!/^(http|\/\/)/.test(params.url)) {
        params.url = host + params.url;
      }//设置默认host
      params.data = Dec.Encrypt(JSON.stringify(params.data));//加密
      return params;
    },
  },
});
wxApiInterceptors({
  request: {
    response(res) {
      if(res.data){
        var result = res.data.replace(/["]+/g, '');//去多余的双引号
        return JSON.parse(Dec.formatString(Dec.Decrypt(result)));//返回值去字符转之间空格
      }
    },
  },
});
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.authorize({
    //   scope:"scope.userLocation",
    //   success:(res)=>{
    //     console.log("成功")
    //   },
    //   fail:(res)=>{
    //     console.log("失败")
    //   }
    // }),
    //设置权限
    // wx.openSetting({
    //   success: (res) => {
    //     console.log(res)
    //       // res.authSetting = {
    //       //   "scope.userInfo": false,
    //       //   "scope.userLocation": true
    //       // }
    //   }
    // })
    //检查登录
    let that = this
    wx.checkSession({
      success: function (e) {
        console.log("没有过期")
      },
      fail: function () {
        console.log("过期了")
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
                console.log("我重新登录了")
                console.log(res)
                var openId = res.result
                console.log(openId)
                that.globalData.openId = openId
              }
            })
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        let that = this
        wx.request({
          url: '/medicalcard/getopenid',
          method: "post",
          data: {
            "openId": res.code
          },
          success: function (res) {
            console.log(res)
            var openId = res.result
            console.log(openId)
            that.globalData.openId = openId
            wx.request({
              url: '/common/getweachat',//获取游客记录
              method: "post",
              data: {
                "hospitalID": openId,
                "hospitalName": that.globalData.userInfo.nickName
              },
              success: function (res) {
              }
            })
          }
        })
      }
    })
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
        }else{
          wx.authorize({
            scope: "scope.userLocation",
            success:(res)=>{
              var that = this
              wx.getLocation({
                success: function (res) {
                  if (res != undefined && res != null) {
                    //保存用户的当前经纬度
                    that.globalData.latitude = res.latitude,
                    that.globalData.longitude = res.longitude
                  }
                },
              })
            }
          })
        }
        //获取游客头像和登录信息
        if (res.authSetting['scope.userInfo']) {
          console.log("来了")
          let that = this
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              //保存用户信息和头像
              that.globalData.userInfo = res.userInfo
              //用户登录
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = user
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }else{
          console.log("跳了")
          wx.reLaunch({
            url: '/pages/tologin/tologin',
          })
          //获取用户信息失败后。请跳转授权页面
          // wx.showModal({
          //   title: '警告',
          //   content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //       wx.navigateTo({
          //         url: '../tologin/tologin',
          //       })
          //     }
          //   }
          // })
        }
      },
      fail:res=>{
        console.log("失败了")
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