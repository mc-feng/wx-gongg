// pages/docterdetails/docterdetails.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    change:false,
    collect:true,
    date:null,
    docterbook: [],
    docPhotoPath:"",
    docMemo:"",
    docCode:"",
    docDuty:"",
    transData:{},
    loading:true,
    accessToken: ""//判断是那个医院的accessToken
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
      console.log(app.globalData.openId)
      wx.request({
        url: '/medicalcard/deletedoclist',
        method:"post",
        data:{
          "docID": that.data.date.doccode,
          "openID": app.globalData.openId//--openID
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
        url: '/medicalcard/adddoclist',
        method:"post",
        data:{
          "docID": that.data.date.doccode,
          "openID": app.globalData.openId//--openID
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
    if (objects.trans.hos == "01"){
      that.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB6"
      })
    } else if (objects.trans.hos == "02"){
      that.setData({
        accessToken: " 800EBED9-63E5-4408-A184-BE693DA32CB7"
      })
    }
    console.log(objects)
    console.log(that.data.accessToken)
    wx.request({
      url: '/booking/getbookingdocresource',
      method: "post",
      data: {
        "docCode": objects.doccode,
        "day": objects.now.trim(),
        "accessToken": that.data.accessToken,
        "openUserID": "2088022943884345",
      },
      success: function (res) {
        console.log(res)
        let transData={
          hospital: objects.trans.title,
          office: objects.trans.office,
          docName: res.result[0].docCode,
          hos: objects.trans.hos
        };
        console.log(res)
        console.log(transData)
        that.setData({
          docterbook: res.result,
          docPhotoPath: res.result[0].docPhotoPath,
          docMemo: res.result[0].docMemo,
          docCode: res.result[0].docCode,
          docDuty: res.result[0].docDuty,
          transData: transData,
          loading:false
        })
        // 请求是否已经收藏
        wx.request({
          url: '/medicalcard/checkDoc',
          method: "post",
          data: {
            "docID": that.data.date.doccode,
            "openID": app.globalData.openId//--openID
          },
          success: function (res) {
            that.setData({
              collect:!res.success
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