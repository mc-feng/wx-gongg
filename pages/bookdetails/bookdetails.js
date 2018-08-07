Page({
  /**
   * 页面的初始数据
   */
  data: {
    details: [{ "name": "张科名", "position": "副主任医师", "introduce": "毕业于上海第二医科大学临…" }, { "name": "张科名", "position": "副主任医师", "introduce": "毕业于上海第二医科大学临…" }, { "name": "张科名", "position": "副主任医师", "introduce": "毕业于上海第二医科大学临…" }],
    arr: [],
    weeks: [],
    months:[],
    lastDay: null,
    firstDay: null,
    year: null,
    resultData: [],
    nowmonth:null,
    nowdate:null,
    nowweek:null
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
      nowdate: e.currentTarget.dataset.date
    })
    this.setData({
      nowweek: e.currentTarget.dataset.week
    })

    this.setData({
      nowmonth: e.currentTarget.dataset.month
    })
  },
  //页面跳转传对象
  link:function(e){

    let str = JSON.stringify(e.currentTarget.dataset)
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
  onLoad: function (options) {
    this.dataTime();
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