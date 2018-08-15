Page({
  data: {
    content: [{ "title": "金山总部", "leve": "三级甲等", "place": "上海市金山区嘈廊公路2901号", "distance": "139.99","hospitalID":"01"}, 
      { "title": "市区总部", "leve": "三级甲等", "place": "上海市虹口区同心路921号", "distance": "139.99", "hospitalID": "02"}],
    result:""
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://192.168.2.165:8081/common/checkdata',
      method: "post",
      data: {
        "hospitalID": "800EBED9-63E5-4408-A184-BE693DA32CB6"
      },
      success: function (res) {
        //判断绑卡操作
        if (res.data.result== 1){
          that.setData({
            result: true
          })
        } else if (res.data.result == 0){
          that.setData({
            result: false
          })
        }
      }
    })
  },
  linkToDepartments:function(e){
    console.log(e)
    let str = JSON.stringify(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../bookdepartments/bookdepartments?data=' + str,
    })
  }
})
