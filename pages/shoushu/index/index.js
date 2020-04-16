// pages/shoushu/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: "0",
    reslut:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: '/medicalcard/getweachattopatient',
      method: "post",
      data: {
        "openId": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        var showData = [];
        for (var i = 0; i < res.result.length; i++) {
          showData.push(res.result[i].openUserName + " " + res.result[i].createTime)
        }
        var patientID = res.result[0].patientID
        that.getContent(patientID)
        console.log(showData)
        that.setData({
          saveData: res.result,
          showChoose: showData,
        })
      }
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  onGetShow: function (e) {
    console.log(e.detail)
    var index = e.detail
    var patientID = this.data.saveData[index].patientID
    this.data.selectIndex = index
    this.data.patientID = patientID 
    console.log(patientID)
    this.getContent(patientID)
  },
  getContent(patientID){
    var that = this
    wx.showLoading()
    wx.request({
      url: '/hospitalization/getZySsts',
      data:{
        patientID 
      },
      method:"post",
      success(res){
        that.setData({
          reslut: res.result
        })
        console.log(res)
      },
      complete(){
        wx.hideLoading()
      }
    })
  },
  link(){
    wx.navigateTo({
      url: '../mazui/mazui',
    })
  },//链接手术详情
  checkPro(){//查看进度
     wx.request({
       url: '/hospitalization/getZySsxx',
       method:"post",
       data:{
         "patientID": this.data.patientID
       },
       success(res){
         console.log(res)
         if (res.result.status =="1"){
           var text = res.result.progress
         }else{
           var text = "预约中~~还未开始"
         }
         wx.showModal({
           title: '当前手术进度',
           content: text,
           showCancel:false,
           success(res) {
             if (res.confirm) {
             }
           }
         })
       },
       fail(){
         wx.showToast({
           title: '查看失败',
         })
       }
     })
  }
})