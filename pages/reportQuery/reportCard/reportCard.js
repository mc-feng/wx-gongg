// pages/reportQuery/reportCard/reportCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transData:{},
    paremtList:[],
    canload :false,
    showBottom:true,
    reportNo:[],
    loading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取转移数据
    var transData = JSON.parse(options.transData)
    //判断在哪个院区
    var accessToken =""
    if (transData.accessToken == "金山院区"){
      accessToken = "800EBED9-63E5-4408-A184-BE693DA32CB7"
    } else if (transData.accessToken == "虹口院区"){
      accessToken = "800EBED9-63E5-4408-A184-BE693DA32CB6"
    }
    //获取年月
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var nowData = year + "年" + month +"月"
    this.setData({
      transData: transData,
      nowData : nowData,
      year:year,
      month:month,
      accessToken: accessToken
    })
    wx.request({
      url: '/report/getjianyanreportlist',
      method:"post",
      data:{
       "accessToken": accessToken,
        "openUserID": transData.patientID
      },
      success:function(res){
        console.log(res)
        if (res.success){
          wx.request({
            url: '/report/getjianyanreport',
            method:"post",
            data:{
              "openUserID": transData.patientID,
              "dataSource": year + "-" + that.formatNumber(month)
            },
            success:function(res){
              var reportNo =[]
              for (var i = 0; i < res.result.length;i++){
                reportNo.push(res.result[i].reportNo)
                res.result[i].reportNo = res.result[i].reportNo.split("||")[0]
              }
              that.setData({
                paremtList : res.result,
                canload : true,
                reportNo: reportNo,
                loading:false
              })
            }
          })
        }else{
          that.setData({
            loading: false
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
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  loadMore: function(n){
    var that = this
    that.setData({
      loading:true
    })
    if(that.data.canload){
      that.data.month = that.formatNumber(that.data.month - 1)
      if (that.data.month == "00") {
        that.data.year = that.data.year - 1
        that.data.month = 12
      }
      console.log(that.data.month)
      wx.request({
        url: '/report/getjianyanreport',
        method: "post",
        data: {
          "openUserID": that.data.transData.patientID,
          "dataSource": that.data.year + "-" + that.data.month
        },
        success: function (res) {
          var reportNo = []
          for (var i = 0; i < res.result.length; i++) {
            reportNo.push(res.result[i].reportNo)
            res.result[i].reportNo = res.result[i].reportNo.split("||")[0]
          }
          if (res.total == res.result.length){
            that.setData({
              showBottom : false
            })
          }
          that.setData({
            paremtList: res.result,
            reportNo: reportNo,
            loading:false
          })
        }
      })
    }else{
      that.setData({
        loading: false
      })
    }
  },
  linkToDetail:function(res){
    var index = res.currentTarget.dataset.index
    console.log(res.currentTarget.dataset.index)
    var transDetailData = {
      accessToken: this.data.accessToken,
      patientID: this.data.transData.patientID,
      reportNo: this.data.reportNo[index],
      reportName: this.data.paremtList[index].reportType
    }
    transDetailData = JSON.stringify(transDetailData)
    wx.navigateTo({
      url: '../../reportQuery/xueReport/xueReport?transDetailData=' + transDetailData
    })
  }
})