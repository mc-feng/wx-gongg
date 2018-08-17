// pages/docterdetails/docterdetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    change:true,
    collect:false,
    date:null,
    docterbook: [],
    docPhotoPath:"",
    docMemo:"",
    docCode:"",
    docDuty:"",
    transData:{}
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
  collectchange:function(){
    if (this.data.collect === false) {
      this.setData({
        collect: true
      })
    } else {
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
        "openUserID": "",
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
          transData: transData
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