Page({
  /**
   * 页面的初始数据
   */
  data: {
    details: [],
    arr: [],
    weeks: [],
    months:[],
    lastDay: null,
    firstDay: null,
    year: null,
    resultData: [],
    nowmonth:null,
    nowdate:null,
    nowweek:null,
    transferData:null,
    shownormal:"",
    avatar:[],
    showDate : "",
    catalogSelect:""
  },
  //获取日历相关参数
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;
    this.setData({
      year:year
    })
    //获取现今月份
    this.data.month = months;
    this.setData({
      nowmonth: months
    })
    //获取今日日期
    this.data.getDate = date.getDate();
    this.setData({
      nowdate: date.getDate()
    })
    let firstDay = new Date(year, month, this.data.nowdate);
    this.data.firstDay = firstDay.getDay();
    switch (this.data.firstDay) {
      case (0):
        this.setData({
          nowweek: "日"
        }); break;
      case (1):
        this.setData({
          nowweek:"一"
        }); break;
      case (2):
        this.setData({
          nowweek:"二"
        }); break;
      case (3):
        this.setData({
          nowweek:"三"
        }); break;
      case (4):
        this.setData({
          nowweek:"四"
        }); break;
      case (5):
        this.setData({
          nowweek:"五"
        });break;
      case (6):
        this.setData({
          nowweek:"六"
        }); break;
    }
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();
    for (let i = 0; i < 28; i++) {
      if (this.data.getDate < this.data.lastDay) {
        this.data.getDate++;
        this.data.arr.push(this.data.getDate);
        this.data.months.push(this.data.month);
        let firstDay = new Date(year, month, this.data.getDate);
        this.data.firstDay = firstDay.getDay();
        this.switchWeek(this.data.firstDay)
      } else {
        this.data.getDate = 0;
        this.data.getDate++;
        this.data.arr.push(this.data.getDate);
        month = month+1;
        this.data.month = this.data.month+1;
        this.data.months.push(this.data.month);
        let firstDay = new Date(year, month, this.data.getDate);
        this.data.firstDay = firstDay.getDay();
        this.switchWeek(this.data.firstDay)
      }
    }
    //第一天星期几
  },
  //改变日期
  changdate:function(e){
    this.setData({
      nowmonth: e.currentTarget.dataset.month,
      nowweek: e.currentTarget.dataset.week,
      nowdate: e.currentTarget.dataset.date - 1,
      loading:false,
      catalogSelect:e.currentTarget.dataset.index
    })
    this.sendData();
  },
  //页面跳转传对象
  link:function(e){
    let str = JSON.stringify(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../docterdetails/docterdetails?date='+str,
    })
  },
  //字符串分割
  switchWeek:function(date){
      switch (date) {
        case (0): this.data.weeks.push("日"); break;
        case (1): this.data.weeks.push("一"); break;
        case (2): this.data.weeks.push("二"); break;
        case (3): this.data.weeks.push("三"); break;
        case (4): this.data.weeks.push("四"); break;
        case (5): this.data.weeks.push("五"); break;
        case (6): this.data.weeks.push("六"); break;
      }
  },
  split_array: function (arr, len){
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
      newArr.push(arr.slice(i, i + len));
    }
    return newArr;
  },
  sendData:function(){
    let that = this;
    //默认发送后一天日期
    let datetime = "";
    if (that.data.nowmonth < 10 && that.data.nowdate >= 10) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth < 10 && that.data.nowdate < 10 ) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate < 10 ){
      datetime = that.data.year + "-"  + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate >=10){
      datetime = that.data.year + "-" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    }
    that.setData({
      showDate: datetime,
      catalogSelect:this.data.nowdate + 1
    })
    console.log(datetime)
    console.log(that.data.transferData)
    wx.request({
      url: 'http://192.168.2.165:8081/booking/getbookingdeptnosource',
      method: "post",
      data: {
        "deptCode": that.data.transferData.id,
        "day": datetime,
        "accessToken": "800EBED9-63E5-4408-A184-BE693DA32CB6",
        "openUserID": "2088022943884345",
      },
      success: function (res) {
        console.log(res)
        that.setData({
          details: res.data.result,
          loading:true
        })
      }
    })
  },
  onLoad: function (options) {
    // 获取日期参数
    this.dataTime();
    //接受上一页传过来的参数
    let objects = JSON.parse(options.data);
    console.log(objects)
    if (objects.leve=="普通"){
      this.setData({
        shownormal:true
      })
    } else if (objects.leve == "专家"){
      this.setData({
        shownormal: false
      })
    }
    this.setData({
      transferData: objects
    });
    //发送数据
    this.sendData();
    //数组转换为对象数组
    var activeSubjectsArr = [];
    for (var i = 0; i < this.data.weeks.length; i++) {
      var activeSubjectsObject = {};
      for (var j = 0; j < this.data.arr.length; j++) {
        if (i == j) {
          activeSubjectsObject.name = this.data.weeks[i];
          activeSubjectsObject.value = this.data.arr[j];
          activeSubjectsObject.months = this.data.months[j];
          activeSubjectsArr.push(activeSubjectsObject);
        }
      }
    }
    //分割成为新数组
    var relust = this.split_array(activeSubjectsArr,7);
    this.setData({
      resultData: relust
    })
  }
})