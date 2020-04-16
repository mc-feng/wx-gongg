// pages/inHospital/inHospital.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:true,
    currentTab:"0",
    userName:"",
    identityCard:"",
    phoneNumber:"",
    medicareCard:"",
    parameter: [{ id: 1 }, { id: 2}],//模拟数据(第一次默认选中)
    transData:"",
    data:{},
    showChoose:["本人","父母","子女","配偶","朋友"],
    index:0,
    accessToken: "",
    loading:true,
    link5:true,//防止点击多次
    listArr: []//判断关系
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
    this.setData({
      link5:true,
      loading:true
    })
    var that = this;
    console.log(this.data.data.trans.hospital)
    wx.request({
      url: '/medicalcard/getweachattopatient',
      method: "post",
      data: {
        "openId": app.globalData.openId,
        "paid": this.data.data.trans.hospital
      },
      success: function (res) {
        console.log(res.result)
        let parameter = res.result;
        let listArr = []
        for (var i = 0; i < parameter.length; i++) {
          switch (parameter[i].tel) {
            case "0":
              listArr.push("本人");
              break;
            case "1":
              listArr.push("父母");
              break;
            case "2":
              listArr.push("子女");
              break;
            case "3":
              listArr.push("配偶");
              break;
            case "4":
              listArr.push("朋友");
              break;
          }
        }
        that.setData({
          parameter: parameter,
          listArr: listArr,
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
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

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
    console.log(this.data.currentTab)
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
      identityCard: e.detail.value.trim()
    })
    console.log(this.data.identityCard)
  },
  getUserphoneNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value.trim()
    })
    console.log(this.data.phoneNumber)
  },
  getUsermedicareCard: function (e) {
    this.setData({
      medicareCard: e.detail.value.split(" ").join("")
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
    }  else {
      this.setData({
        link4: true
      })
    }
    // 发送请求
    let that = this
    if (that.data.link1 && that.data.link2 && that.data.link3 && that.data.link4 && that.data.link5) {
      console.log("可以发送")
      that.setData({
        link5:false
      })
      wx.request({
        url: '/medicalcard/checkidfrom',
        method: "post",
        data: {
          "cardProperty": this.data.index,
          "cardType": this.data.currentTab,
          "openUserID": app.globalData.openId,
          "cardNo": this.data.medicareCard,
          "certType": "0",
          "openIDCard": this.data.identityCard,
          "openTel": this.data.phoneNumber,
          "openUserName": this.data.userName
        },
        success: function (res) {
          let addMessage = {
            "openID": app.globalData.openId,
            "tel": that.data.phoneNumber,
            "idCard": that.data.identityCard,
            "patientName": that.data.userName,
            "cardNo": that.data.medicareCard,
            "cardProperty": that.data.index,
            "cardType": that.data.currentTab
          }
          let transData = JSON.stringify(addMessage)
          let str = JSON.stringify(res)
          console.log(res);
          if (res.success) {
            wx.showToast({
              icon: "none",
              title: res.message,
              duration: 1500
            })
            setTimeout((() => {
              wx.navigateTo({
                url: '../chooseHospital/chooseHospital?cardData=' + str + "&transData=" + transData,
              })
            }), 1000)
          } else {
            wx.showToast({
              icon: "none",
              title: res.message,
              duration: 1500
            })
            that.setData({
              link5: true
            })
          }
        }
      })
    } else {
      console.log("发送失败")
    }
  },
  // 确认就诊人
  ConfirmPatient:function(res){
    if (this.data.transData == ""){
      wx.showToast({
        title: '您未选择就诊卡',
        icon: 'none',
        duration: 2000
      })
    }else{
      let str = JSON.stringify(this.data.transData);
      let str2 = JSON.stringify(this.data.data);
      wx.navigateTo({
        url: '../bookorder/bookorder?patient=' + str + '&nowData=' + str2,
      })
    }
  },
  // 弹出关系框点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})