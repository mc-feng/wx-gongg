// pages/inHospital/inHospital.js
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
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data){
      let objects = JSON.parse(options.data);
      console.log(objects);
      this.setData({ data: objects });
      this.data.parameter[0].checked = true;
    }
    var that =this;
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/getweachattopatient',
      method: "post",
      data: {
        "openId": "123456"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          parameter:res.data.result
        })
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
  addCard:function(){
    console.log(this.data.identityCard)
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/getRecordCard',
      method:"post",
      data:{
        "openID":"123456",
        "tel": this.data.phoneNumber,
        "idCard": this.data.identityCard,
        "patientName": this.data.userName,
        "cardNo": this.data.medicareCard,
        "cardType": 0,
        "cardProperty": this.data.index,
        "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
        "openUserID": "2088022943884345",
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  ConfirmPatient:function(res){
    let str = JSON.stringify(this.data.transData);
    let str2 = JSON.stringify(this.data.data)
    wx.navigateTo({
      url: '../bookorder/bookorder?patient=' + str + '&nowData=' + str2,
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