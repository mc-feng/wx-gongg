// pages/collectdetails/collectdetails.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    weeks: [],
    months: [],
    lastDay: null,
    firstDay: null,
    year: null,
    resultData: [],
    nowmonth: null,
    nowdate: null,
    nowweek: null,
    showDate:"",
    catalogSelect: "",
    // 日期列表
    change: true,//显示简介
    collect: true,
    date: null,
    docterbook: [],
    docPhotoPath: "",
    docMemo: "",
    docCode: "",
    docDuty: "",
    transData: {},
    transData:{},//需要转移的数据
    accessToken:"",
    hos:""
  },
  //简介切换
  expand: function () {
    if (this.data.change === false) {
      this.setData({
        change: true
      })
    } else {
      this.setData({
        change: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let objects = JSON.parse(options.data);
    console.log(objects)
    if (objects.hospitalID == "42500982800") {
      that.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB7",
        hos:"42500982800"
      })
    } else if (objects.hospitalID == "Y0041800100") {
      that.setData({
        accessToken: "800EBED9-63E5-4408-A184-BE693DA32CB6",
        hos: "Y0041800100"
      })
    }
    this.dataTime();
    this.sendData();
    let transData = {
      hospital: objects.hospitalName,
      office: objects.deptName2,
      docName: objects.docName,
      hos:that.data.hos
    };
    this.setData({
      date: objects,
      docPhotoPath:objects.docPhotoPath,
      docMemo: objects.docDesc,
      docCode: objects.docName,
      docDuty: objects.docDuty,
      transData: transData
    })
    wx.request({
      url: '/booking/getbookingdocresource',
      method: "post",
      data: {
        "docCode": objects.docCode,
        "day": that.data.showDate,
        "accessToken": that.data.accessToken,
        "openUserID": app.globalData.openId,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          docterbook: res.result
        })
        // 是否收到信息表
        // if (res.result.length == 0) {
        //   that.setData({
        //     docterbook: res.result,
        //   })
        // } else {
        //   that.setData({
        //     docterbook: res.result
        //   })
        // }
        // 请求是否已经收藏
        wx.request({
          url: '/medicalcard/checkDoc',
          method: "post",
          data: {
            "docID": that.data.date.docCode,
            "openID": app.globalData.openId//--openID
          },
          success: function (res) {
            that.setData({
              collect: !res.success
            })
            wx.request({//查询排班日期
              url: '/booking/getbookingdocresourceAll',
              // url: '/booking/getbookingdocresource',
              method: "post",
              data: {
                "docCode": objects.docCode,
                // "day": datetime,
                "accessToken": that.data.accessToken,
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
                      for (var k = 0; k < res.result.length; k++) {//每一天和排班日期对比
                        if (that.data.arr[j] == res.result[k].day && that.data.months[j] == res.result[k].month) {
                          activeSubjectsObject.check = true
                          break;
                        } else {
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
                wx.hideLoading()
              }
            })
          }
        })
      }
    })
    // var activeSubjectsArr = [];
    // for (var i = 0; i < this.data.weeks.length; i++) {
    //   var activeSubjectsObject = {};
    //   for (var j = 0; j < this.data.arr.length; j++) {
    //     if (i == j) {
    //       activeSubjectsObject.name = this.data.weeks[i];
    //       activeSubjectsObject.value = this.data.arr[j];
    //       activeSubjectsObject.months = this.data.months[j];
    //       activeSubjectsArr.push(activeSubjectsObject);
    //     }
    //   }
    // }
    // //分割成为新数组
    // var relust = this.split_array(activeSubjectsArr, 7);
    // this.setData({
    //   resultData: relust
    // })
  },
  //检查日期
  checkData: function (datas) {
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
    if (datas > monthDaySize) {
      that.setData({
        nowmonth: that.data.nowmonth + 1,
        nowdate: 0
      })
      if (that.data.nowmonth + 1 > 12) {
        that.setData({
          nowmonth: 1,
          year: that.data.year + 1,
        })
      }
    }
  },
  sendData: function () {
    let that = this;
    //默认发送后一天日期
    let datetime = "";
    this.checkData(that.data.nowdate + 1);
    if (that.data.nowmonth < 10 && that.data.nowdate+1 >= 10) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth < 10 && that.data.nowdate+1 < 10) {
      datetime = that.data.year + "-" + "0" + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate+1 < 10) {
      datetime = that.data.year + "-" + that.data.nowmonth + "-" + "0" + (that.data.nowdate + 1);
    } else if (that.data.nowmonth >= 10 && that.data.nowdate+1 >= 10) {
      datetime = that.data.year + "-" + that.data.nowmonth + "-" + (that.data.nowdate + 1);
    }
    that.setData({
      showDate: datetime,
      catalogSelect: this.data.nowdate + 1
    })
    console.log(datetime)
  },
  linkBook: function (e) {
    let str = JSON.stringify(e.currentTarget.dataset)
    console.log(str)
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
      year: year
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
          nowweek: "一"
        }); break;
      case (2):
        this.setData({
          nowweek: "二"
        }); break;
      case (3):
        this.setData({
          nowweek: "三"
        }); break;
      case (4):
        this.setData({
          nowweek: "四"
        }); break;
      case (5):
        this.setData({
          nowweek: "五"
        }); break;
      case (6):
        this.setData({
          nowweek: "六"
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
        month = month + 1;
        this.data.month = this.data.month + 1;
        this.data.months.push(this.data.month);
        let firstDay = new Date(year, month, this.data.getDate);
        this.data.firstDay = firstDay.getDay();
        this.switchWeek(this.data.firstDay)
      }
    }
    //第一天星期几
  },
  // 改变日期
  changdate: function (e) {
    var date = new Date();
    if (e.currentTarget.dataset.month == 13) {
      this.setData({
        nowmonth: 1,
        year: date.getFullYear() + 1
      })
    } else {
      this.setData({
        nowmonth: e.currentTarget.dataset.month,
        year: date.getFullYear()
      })
    }
    this.setData({
      nowmonth: e.currentTarget.dataset.month,
      nowweek: e.currentTarget.dataset.week,
      nowdate: e.currentTarget.dataset.date - 1,
      catalogSelect: e.currentTarget.dataset.index,
    })
    this.sendData();
    wx.showLoading({
      title: '加载中',
    })
    // 获取医生信息详情
    var that = this
    wx.request({
      url: '/booking/getbookingdocresource',
      method: "post",
      data: {
        "docCode": that.data.date.docCode,
        "day": that.data.showDate,
        "accessToken": that.data.accessToken,
        "openUserID": app.globalData.openId,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          docterbook: res.result
        })
        // if (res.result.length == 0){
        //   that.setData({
        //     docterbook: res.result,
        //   })
        // }else{
        //   that.setData({
        //     docterbook: res.result
        //   })
        // }
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  },
  // 字符串分割
  switchWeek: function (date) {
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
  split_array: function (arr, len) {
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
      newArr.push(arr.slice(i, i + len));
    }
    return newArr;
  },
})