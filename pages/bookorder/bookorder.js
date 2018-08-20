// pages/bookorder/bookorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data:null,
      patientMessage:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data){
      let objects = JSON.parse(options.data);
      console.log(objects);
      this.setData({ data: objects });
    }else{
      console.log(options)
      let patientMessage = JSON.parse(options.patient);
      console.log(patientMessage);
      let objects = JSON.parse(options.nowData);
      console.log(objects);
      this.setData({ 
        data: objects,
        patientMessage: patientMessage
      });
    }
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
  // 弹出框
  showmode:function(e){
   wx.request({
     url: 'http://192.168.2.165:8081/booking/confirmbooking',
     method:'post',
     data:{
       "hospt": this.data.data.trans.hospital,
       "dept": this.data.data.trans.office,
       "doc": this.data.data.trans.docName,
       "cost": this.data.data.price,
       "time": this.data.data.now + " " + this.data.data.time,
       "resourceID": this.data.data.resourceid,
       "hospitalUserID": this.data.patientMessage.openId,
       "patientID": this.data.patientMessage.patientID,
       "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
       "openUserID": "",
     },
     success:function(res){
       console.log(res)
     }
   })
   this.showView()
  },
  showView:function(){
    // 显示遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    this.hideView();
  },
  hideView:function(){
    // 隐藏遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  linksuccee:function(){
    wx.navigateTo({
      url:'../booksuccee/booksuccee',
    })
  },
  linkToCard:function(){
    let str = JSON.stringify(this.data.data)
    wx.navigateTo({
      url: '../inHospital/inHospital?data=' + str,
    })
  }
})