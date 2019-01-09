// pages/reportReading/analysis/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,//初始点击状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }

   });
   var data = JSON.parse(options.data)
   var advise = JSON.parse(data.adviseArray)
   var checked = data.checkedOverview
   var templateList = data.templateList
   var checkedArr = [];
   for (var i = 0; i < checked.length;i++){
     checked[i].indexNames.map((item, index, arr) => { item.tempName = checked[i].templateName; item.advShow = false})
     checkedArr = checkedArr.concat(checked[i].indexNames)
   }
    for (var j = 0; j < templateList.length;j++){
      templateList[j].indexList.map((item, index, arr) => { item.show = false})
    }
   this.setData({
     advise: advise,
     checkedArr: checkedArr,
     templateList: templateList
   })
   console.log(data)
   console.log(advise)
   console.log(checkedArr)
   console.log(templateList)
  },
  //点击切换
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
  //手滑切换
  bindChange:function(e){
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //显示建议
  showAdv:function(e){
    var smallIndex = e.currentTarget.dataset.smallindex;
    var bigIndex = e.currentTarget.dataset.bigindex;
    this.data.templateList[bigIndex].indexList[smallIndex].show = !this.data.templateList[bigIndex].indexList[smallIndex].show
    this.setData({
      templateList: this.data.templateList
    });
  },
  //显示解读
  showRes:function(e){
    var index = e.currentTarget.dataset.index;
    this.data.advise[index].advShow = !this.data.advise[index].advShow;
    this.setData({
      advise: this.data.advise
    })
  },
  //保存报告
  saveSubmit:function(res){
    wx.navigateBack({
      delta: 1
    })
  }
})