
// pages/managePatient/managePatient.js
// pages/inHospital/inHospital.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: true,
    currentTab: 0,
    userName: "",
    identityCard: "",
    phoneNumber: "",
    medicareCard: "",
    parameter: [],//就诊卡列表
    data: {},
    showChoose: ["本人", "父母", "子女", "配偶", "朋友"],
    index: 0,
    loading:true,
    noBind:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      noBind:false
    })
    var that = this;
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
        //判断绑卡操作
        if (res.data.result == 2) {
          that.setData({
            noBind: true
          })
        } else if (res.data.result == 4) {
          that.setData({
            noBind: true
          })
        }
        if (!that.data.noBind) {
          wx.request({
            url: 'http://192.168.2.165:8081/medicalcard/getweachattopatient',
            method: "post",
            data: {
              "openId": app.globalData.openId
            },
            success: function (res) {
              console.log(res)
              let parameter = res.data.result
              that.setData({
                parameter: parameter
              })
            }
          })
        }
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
  change: function () {
    this.setData({
      card: !this.data.card
    })
  },
  swichNav: function (e) {
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
  // 获取姓名
  getUseruserName: function (e) {
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
  noadd: function () {
    this.setData({
      card: !this.data.card
    })
  },
  // 确认添加卡
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
        link1 : false
      })
      wx.showToast({
        title: '姓名不能为空',
      })
    }else{
      this.setData({
        link1: true
      })
    }
    // 验证手机号码
    if (phoneNumber == ""){
      this.setData({
        link2: false
      })
      wx.showToast({
        title: '手机号不能为空',
      })
    }else if (!myreg.test(phoneNumber)) {
      this.setData({
        link2: false
      })
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
    }else {
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
        title: '身份证不能为空',
      })
    } else if (!idreg.test(identityCard)) {
      console.log(10)
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
    } else if (!regNum.test(medicareCard)){
      this.setData({
        link4: false
      })
      wx.showToast({
        title: '卡号格式不正确',
      })
    }else{
      this.setData({
        link4: true
      })
    }
    // 发送请求
    let that = this
    if (that.data.link1 && that.data.link2 && that.data.link3 && that.data.link4){
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
    //     "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
    //     "openUserID": "2088022943884345",
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    }else{
      console.log("发送失败")
    }
  },
  // 弹出关系框点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    console.log(e)
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex,200)
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, xmove) {
    let parameter = this.data.parameter
    parameter[productIndex].xmove = xmove
    console.log(xmove)
    this.setData({
      parameter: parameter
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    console.log(e)
    if (e.detail.source === 'friction') {
      console.log(e.detail.x)
      if (e.detail.x < 51.8) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },

  /**
   * 删除就诊卡
   */
  handleDeleteProduct: function (e) {
    let that = this
    let productIndex = e.currentTarget.dataset.productindex
    let parameter = this.data.parameter
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/deletepatient',
      method: "post",
      data: {
        "patientID": parameter[productIndex].patientID,
        "hosptFrom": parameter[productIndex].idCard
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '解绑成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
    parameter.splice(productIndex, 1)
    
    this.setData({
      parameter: parameter
    })
    if (parameter[productIndex]) {
      this.setXmove(productIndex, 0)
    }
  },
  LinkToPeople: function (e) {
    wx.navigateTo({
      url: '../editPeopleMess/editPeopleMess',
    })
  }
})