// pages/inHospital/inHospital.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:true,
    currentTab:0,
    userName:"",
    identityCard:"",
    phoneNumber:"",
    medicareCard:"",
    parameter: [{ id: 1 }, { id: 2}],//模拟数据(里面必须要对象先初始定义---不知道为什么)
    transData:{},
    data:{},
    showChoose:["本人","父母","子女","配偶","朋友"],
    index:0,
    accessToken: "",
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let objects = JSON.parse(options.data);
      console.log(objects);
      this.setData({ data: objects });
      this.data.parameter[0].checked = true;
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
    this.data.loading = true;
    var that = this;
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/getweachattopatient',
      method: "post",
      data: {
        "openId": app.globalData.openId,
        "paid": this.data.data.trans.hospital
      },
      success: function (res) {
        console.log(res)
        that.setData({
          parameter: res.data.result,
          loading:false
        })
      }
    })
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
  change:function(){
    this.setData({
      card: !this.data.card
    })
  },
  swichNav:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 参数点击响应事件（确认绑定那一张就诊卡）
  parameterTap: function (e) {//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].openId == this_checked) {
        parameterList[i].checked = true;//当前点击的位置为true即选中
        //设置需要传输的数据
        that.setData({
          transData: parameterList[i]
        })
      }
      else {
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList
    })
    console.log(that.data.transData)
  },
  getUseruserName:function(e){
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },
  getUseridentityCard: function (e) {
    this.setData({
      identityCard: e.detail.value
    })
    console.log(this.data.identityCard)
  },
  getUserphoneNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log(this.data.phoneNumber)
  },
  getUsermedicareCard: function (e) {
    this.setData({
      medicareCard: e.detail.value
    })
    console.log(this.data.medicareCard)
  },
  noadd:function(){
    this.setData({
      card: !this.data.card
    })
  },
  //添加就诊卡
  addCard: function () {
    var userName = this.data.userName;
    var identityCard = this.data.identityCard;
    var phoneNumber = this.data.phoneNumber;
    var medicareCard = this.data.medicareCard;
    // 正则规则
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var idreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    var regNum = /^\d{15}$/
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
    //验证医保号
    if (medicareCard == "") {
      this.setData({
        link4: false
      })
      wx.showToast({
        title: '卡号不能为空',
      })
    } else if (!regNum.test(medicareCard)) {
      this.setData({
        link4: false
      })
      wx.showToast({
        title: '卡号格式不正确',
      })
    } else {
      this.setData({
        link4: true
      })
    }
    // 发送请求
    let that = this
    if (that.data.link1 && that.data.link2 && that.data.link3 && that.data.link4) {
      console.log("可以发送")
      wx.request({
        url: 'http://192.168.2.165:8081/medicalcard/checkidfrom',
        method: "post",
        data: {
          "cardProperty": this.data.index,
          "cardType": "0",
          "openUserID": "2088022943884345",
          "cardNo": this.data.medicareCard,
          "dataSource": app.globalData.openId
        },
        success: function (res) {
          let addMessage = {
            "openID": app.globalData.openId,
            "tel": that.data.phoneNumber,
            "idCard": that.data.identityCard,
            "patientName": that.data.userName,
            "cardNo": that.data.medicareCard,
            "cardProperty": that.data.index,
          }
          let transData = JSON.stringify(addMessage)
          let str = JSON.stringify(res.data)
          console.log(res);
          wx.navigateTo({
            url: '../chooseHospital/chooseHospital?cardData=' + str + "&transData=" + transData,
          })
        }
      })
      // wx.request({
      //   url: 'http://192.168.2.165:8081/medicalcard/getRecordCard',
      //   method: "post",
      //   data: {
      //     "openID": app.globalData.openId,
      //     "tel": this.data.phoneNumber,
      //     "idCard": this.data.identityCard,
      //     "patientName": this.data.userName,
      //     "cardNo": this.data.medicareCard,
      //     "cardType": 0,
      //     "cardProperty": this.data.index,
      //     "accessToken": this.data.accessToken,
      //     "openUserID": "2088022943884345",
      //   },
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
    } else {
      console.log("发送失败")
    }
  },
  // 确认就诊人
  ConfirmPatient:function(res){
    let str = JSON.stringify(this.data.transData);
    let str2 = JSON.stringify(this.data.data);
    wx.navigateTo({
      url: '../bookorder/bookorder?patient=' + str + '&nowData=' + str2 ,
    })
  },
  // 弹出关系框点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})