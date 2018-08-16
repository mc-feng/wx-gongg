// pages/bookdepartments/bookdepartments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:true,
    normallist: [],
    departmentlist:[]
  },
  tabNav: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let objects = JSON.parse(options.data);
    console.log(objects)
    this.setData({
      title: objects.header
    })
    //进行数据请求
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/booking/getdept',
      method: "post",
      data: {
        "hospitalID": objects.hosid
      },
      success: function (res) {
        var allArr = res.data.result;
        var normol =[];
        var department=[];
        for (var i = 0; i < allArr.length;i++){
          if (allArr[i].deptName1 == "普通"){
            normol.push(allArr[i])
          } else if (allArr[i].deptName1 == "专家"){
            department.push(allArr[i])
          }
        }
         that.setData({
           normallist: normol,
           departmentlist: department
         })
        console.log(that.data.normallist);
        console.log(that.data.departmentlist)
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  linToDetails:function(e){
    let str = JSON.stringify(e.currentTarget.dataset)
    console.log(e)
    wx.navigateTo({
      url:'../bookdetails/bookdetails?data=' + str,
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