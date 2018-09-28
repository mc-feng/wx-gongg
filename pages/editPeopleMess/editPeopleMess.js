// pages/editPeopleMess/editPeopleMess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    identityCard:"",
    phoneNumber:"",
    exist:false,
    inputId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/checkweachat',
      method: "post",
      data: {
        "openId": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        if(res.success){
          wx.request({
            url: 'http://192.168.2.165:8081/medicalcard/getweachat',
            method:"post",
            data: {
              "openId": app.globalData.openId
            },
            success:function(res){
              console.log(res)
              that.setData({
                userName: res.result.openUserName,
                identityCard: res.result.openIDCard,
                phoneNumber: res.result.openTel,
                exist: true
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  submitMessage:function(e){
    var userName = this.data.userName;
    var identityCard = this.data.identityCard;
    var phoneNumber = this.data.phoneNumber;
    // 正则规则
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var idreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    //验证姓名
    if (userName == "") {
      this.setData({
        link1: false
      })
      wx.showToast({
        title: '姓名不能为空',
      })
    } else {
      this.setData({
        link1: true
      })
    }
    // 验证手机号码
    if (phoneNumber == "") {
      this.setData({
        link2: false
      })
      wx.showToast({
        title: '手机号不能为空',
      })
    } else if (!myreg.test(phoneNumber)) {
      this.setData({
        link2: false
      })
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
    } else {
      this.setData({
        link2: true
      })
    }
    // 验证身份证
    if (identityCard == "") {
      this.setData({
        link3: false
      })
      wx.showToast({
        title: '身份证号不能为空',
      })
    } else if (!idreg.test(identityCard)) {
      this.setData({
        link3: false
      })
      wx.showToast({
        title: '身份证不正确！',
        icon: 'success',
        duration: 1500
      })
    } else {
      this.setData({
        link3: true
      })
    }
    let that = this
    if (that.data.link1 && that.data.link2 && that.data.link3) {
      if (this.data.exist) {
        wx.request({
          url: 'http://192.168.2.165:8081/medicalcard/updateweachat',
          method: "post",
          data: {
            "openId": app.globalData.openId,
            "openIDCard": that.data.identityCard,
            "openTel": that.data.phoneNumber,
            "openUserName": that.data.userName
          },
          success: function (res) {
            console.log(res)
            if (res.success) {
              wx.showToast({
                title: res.message,
                duration:1000,
              })
              setTimeout((function call(){
                wx.navigateBack({
                  delta: 1
                })
              }),1500)
            }else{
              wx.showToast({
                title: res.message,
                icon:"none",
                duration: 1000,
              })
            }
          }
        })
      } else {
        wx.request({
          url: 'http://192.168.2.165:8081/medicalcard/insertweachat',
          method: "post",
          data: {
            "openId": app.globalData.openId,
            "openIDCard": that.data.identityCard,
            "openTel": that.data.phoneNumber,
            "openUserName": that.data.userName
          },
          success: function (res) {
            console.log(res)
            if (res.success) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    }
  },
  getUseruserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },
  getUseridentityCard:function(e){
    this.setData({
      identityCard: e.detail.value
    })
    console.log(this.data.identityCard)
  },
  getUserphoneNumber:function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log(this.data.phoneNumber)
  },
  input1:function(e){
    console.log(e)
    this.data.inputId = e.currentTarget.dataset.id
  },
  input2: function (e) {
    console.log(e)
    this.data.inputId = e.currentTarget.dataset.id
  },
  input3: function (e) {
    console.log(e)
    this.data.inputId = e.currentTarget.dataset.id
  }
})