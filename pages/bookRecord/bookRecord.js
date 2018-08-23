// pages/bookRecord/bookRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: [{ id: 1 }, { id: 2 }],
    relation:[],
    relations: [],
    choose:[{},{}],
    show:[],
    showChoose:[],
    headerName:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/booking/getpatientlist',
      method:"post",
      data:{
        "openId":"123456"
      },
      success:function(res){
        console.log(res)
        that.setData({
          parameter: res.data.result
        })
        for (var i = 0; i < res.data.result.length;i++){
          switch (res.data.result[i].id) {
            case "0":
              that.data.relation.push("已取消");
              break;
            case "1":
              that.data.relation.push("待就诊")
              break;
            case "2":
              that.data.relation.push("已挂号")
              break;
            case "3":
              that.data.relation.push("已过期")
              break;
            case "4":
              that.data.relation.push("已就诊")
              break;
          }
        }
        that.setData({
          relations: that.data.relation
        })
        console.log(that.data.relation)
      }
    })
    console.log(10)
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/medicalcard/getweachattopatient',
      data: {
        "openId": "123456"
      },
      method: "post",
      success: function (res) {
        console.log(res)
        that.setData({
          choose: res.data.result
        })
        for (var i = 0; i < res.data.result.length;i++){
          that.data.show.push("就诊人: "+res.data.result[i].openUserName + "  " +"卡号: "+ res.data.result[i].openIDCard)
        }
        that.setData({
          showChoose: that.data.show
        })
        console.log(that.data.showChoose)
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
  bindPickerChange:function(e){
    var that = this;
    wx.request({
      url: 'http://192.168.2.165:8081/booking/getpatientlist',
      data: {
        "openId": "123456",
        "patientID":this.data.choose[e.detail.value].patientID
      },
      method: "post",
      success:function(res){
        console.log(res)
        that.setData({
          parameter: res.data.result,
          headerName:false
        })
      }
    })
    console.log(this.data.choose[e.detail.value].patientID)
  },
  parameterTap:function(e){
    console.log(e)
    var str = e.currentTarget.dataset.id
    var relations = e.currentTarget.dataset.relation
    var transData = JSON.stringify(this.data.parameter[e.currentTarget.dataset.index])
    console.log(e)
    wx.navigateTo({
      url: '../bookContent/bookContent?data=' + str + "&relations=" + relations + "&transData=" + transData,
    })
  }
})