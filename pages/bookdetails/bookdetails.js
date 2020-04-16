const app = getApp();
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
    var date = new Date();
    if (e.currentTarget.dataset.month==13){
      this.setData({
        nowmonth:1,
        year: date.getFullYear()+1
      })
    }else{
      this.setData({
        nowmonth: e.currentTarget.dataset.month,
        year: date.getFullYear()
      })
    }
    this.setData({
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
  //检查日期
  checkData:function(datas){
    var that = this;
    var monthDaySize;
    if (that.data.nowmonth == 1 || that.data.nowmonth == 3 || that.data.nowmonth == 5 || that.data.nowmonth == 7 || that.data.nowmonth == 8 || that.data.nowmonth == 10 || that.data.nowmonth == 12) {
      monthDaySize = 31;
    } else if (that.data.nowmonth == 4 || that.data.nowmonth == 6 || that.data.nowmonth == 9 || that.data.nowmonth == 11) {
      monthDaySize = 30;
    } else if (that.data.nowmonth == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((that.data.year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    if (datas>monthDaySize){
      console.log("比那")
      that.setData({
        nowmonth: that.data.nowmonth + 1,
        nowdate : 0
      })
    }
  },
  sendData:function(){
    let that = this;
    //默认发送后一天日期
    this.checkData(that.data.nowdate+1);
    let datetime = "";
    if (that.data.nowmonth < 10 && that.data.nowdate+1 >= 10) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth < 10 && that.data.nowdate+1 < 10 ) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate+1 < 10 ){
      datetime = that.data.year + "-"  + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate+1 >=10){
      datetime = that.data.year + "-" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    }
    that.setData({
      showDate: datetime,
      catalogSelect:this.data.nowdate + 1
    })
    console.log(datetime)
    console.log(that.data.transferData)
    wx.request({
      url: '/booking/getbookingdeptnosource',
      method: "post",
      data: {
        "deptCode": that.data.transferData.id,
        "day": datetime,
        "accessToken": that.data.accessToken,
        "openUserID": app.globalData.openId,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          details: res.result,
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
    if (objects.hos == "Y0041800100"){
      this.setData({
        accessToken:"800EBED9-63E5-4408-A184-BE693DA32CB6"
      })
    } else if (objects.hos == "42500982800"){
      this.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB7"
      })
    }
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
    var that = this;
    //数组转换为对象数组
    wx.request({
      url: "/booking/getBookingDeptNoSourceAll",
      // url: '/booking/getbookingdeptnosource',
      method: "post",
      data: {
        "deptCode": this.data.transferData.id,
        // "day": datetime,
        "accessToken": this.data.accessToken,
        "openUserID": app.globalData.openId,
      },
      success: function (res) {
        console.log(res.result)//获得到有排班的数据
        // console.log(that.data.weeks)//28天周几
        // console.log(that.data.arr)//28天哪一号
        // console.log(that.data.months)
        var activeSubjectsArr = [];
        for (var i = 0; i < that.data.weeks.length; i++) {//数据重组
          var activeSubjectsObject = {};
          for (var j = 0; j < that.data.arr.length; j++) {
            if (i == j) {
              activeSubjectsObject.name = that.data.weeks[i];
              activeSubjectsObject.value = that.data.arr[j];
              activeSubjectsObject.months = that.data.months[j];
              for (var k = 0; k < res.result.length;k++){//每一天和排班日期对比
                if (that.data.arr[j] == res.result[k].day && that.data.months[j] == res.result[k].month){
                  activeSubjectsObject.check = true
                  break;
                }else{
                  activeSubjectsObject.check = false
                }
              }
              activeSubjectsArr.push(activeSubjectsObject);
            }
          }
        }
        console.log(activeSubjectsArr)
        //分割成为新数组
        var relust = that.split_array(activeSubjectsArr, 7);
        that.setData({
          resultData: relust
        })
      }
    })
  }
})