// pages/docterdetails/docterdetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    change:true,
    collect:true,
    date:null,
    docterbook: [],
    docPhotoPath:"",
    docMemo:"",
    docCode:"",
    docDuty:"",
    transData:{},
    loading:true
  },
  expand: function () {
    if(this.data.change ===false){
      this.setData({
        change: true
      })
    }else{
      this.setData({
        change: false
      })
    }
  },
  // 点击收藏按键
  collectchange:function(){
    if (this.data.collect === false) {
      var that = this
      wx.request({
        url: 'http://192.168.2.165:8081/medicalcard/deletedoclist',
        method:"post",
        data:{
          "hospitalID": that.data.date.doccode,
          "hospitalName": "123456"//--openID
        },
        success:function(res){
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 2000
          })
          console.log(res)
        }
      })
      this.setData({
        collect: true
      })
    } else {
      var that = this
      wx.request({
        url: 'http://192.168.2.165:8081/medicalcard/adddoclist',
        method:"post",
        data:{
          "docCode": that.data.date.doccode,
           "hospitalName":"123456"//--openID
        },
        success:function(res){
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          console.log(res)
        }
      })
      this.setData({
        collect: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    let objects = JSON.parse(options.date);
    this.setData({
      date: objects
    })
    console.log(options)
    wx.request({
      url: 'http://192.168.2.165:8081/booking/getbookingdocresource',
      method: "post",
      data: {
        "docCode": objects.doccode,
        "day": objects.now.trim(),
        "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
        "openUserID": "2088022943884345",
      },
      success: function (res) {
        let transData={
          hospital: objects.trans.title,
          office: objects.trans.office,
          docName: res.data.result[0].docCode
        };
        console.log(res)
        console.log(transData)
        that.setData({
          docterbook: res.data.result,
          docPhotoPath: res.data.result[0].docPhotoPath,
          docMemo: res.data.result[0].docMemo,
          docCode: res.data.result[0].docCode,
          docDuty: res.data.result[0].docDuty,
          transData: transData,
          loading:false
        })
        // 请求是否已经收藏
        wx.request({
          url: 'http://192.168.2.165:8081/medicalcard/checkDoc',
          method: "post",
          data: {
            "hospitalID": that.data.date.doccode,
            "hospitalName": "123456"//--openID
          },
          success: function (res) {
            that.setData({
              collect:!res.data.success
            })
          }
        })
      }
    })
  },
  linkBook:function(e){
    let str = JSON.stringify(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../bookorder/bookorder?data=' + str,
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
  
  }
})