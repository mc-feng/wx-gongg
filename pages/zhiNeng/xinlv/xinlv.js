// index.js
import F2 from '../../../component/f2-canvas/lib/f2';
var util = require('../../../utils/util.js');
let chart = null;
function initChart(canvas, width, height) { // 使用 F2 绘制图表
  var data = []
  chart = new F2.Chart({
    el: canvas,
    padding: [45, 'auto', 'auto'],
    width: 370,
    height: 377
  });
  chart.source(data, {
    value: {
      tickCount: 10
    },
    dateTime: {
      range: [0, 1],
    }
  });
  chart.tooltip({
    showTitle: true
  });
  chart.axis('dateTime', {
    label: function label(text, index, total) {
      var textCfg = {
        text: ''
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
        textCfg.text = text;
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
        textCfg.text = text;
      }
      return textCfg;
    }
  });
  chart.line().position('dateTime*value').color('type')
    .shape('type', function (type) {
      if (type === '心率') {
        return 'line';
      }
      if (type === '呼吸率') {
        return 'dash';
      }
    });
  chart.render();
  return chart;
}
Page({
  data: {
    opts: {
      onInit:initChart
    },
    date: "",
    nowTime:"",
    tips:{
      highestHeartRate: "",//最高心率
      highestRespiratoryRate: "",//最高呼吸率
      lowestHeartRate: "",//最低心率
      lowestRespiratoryRate: "",//最低呼吸率
      highestHeartRateTime: "",//最高心率时间
      highestRespiratoryRateTime: "",//最高呼吸率时间
      lowestHeartRateTime: "",//最低心率时间
      lowestRespiratoryRateTime: ""//最低呼吸率时间
    }
  },
  onLoad(e) {
    this.data.patId = e.patId
    this.getDate()
  },
  onReady() {
    var that = this
    setTimeout(that.getDate,500)
  },
  getDate() {//获取时间
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var nowTime = util.formatTimeTwo(timestamp, "Y-M-D");
    console.log(nowTime)
    this.getData(nowTime)
    this.setData({
      date: nowTime,
      nowTime
    })
  },
  bindDateChange(e) {//改变日期
    this.setData({
      date: e.detail.value
    })
  },
  finde() {//查找数据
    console.log(this.data.date)
    this.getData(this.data.date)
  },
  getData(date) {//获取数据
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '/hospitalization/healthHistory',
      method: "post",
      data: {
        caseNum: this.data.patId,
        startDate: date
      },
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.success && res.data){
          var data = res.data
          data.heartRateAppList.map((item, index, arr) => {
            arr[index].value = item.heartRate
            arr[index].type = "心率"
          })
          data.respiratoryRateAppList.map((item, index, arr) => {
            arr[index].value = item.respiratoryRate
            arr[index].type = "呼吸率"
          })
          var list = data.heartRateAppList.concat(data.respiratoryRateAppList)
          console.log(list)
          if (chart.changeData){
            chart.changeData(list)
          }else{
            that.getDate()
          }
          that.data.tips.highestHeartRate = data.highestHeartRate
          that.data.tips.lowestHeartRate = data.lowestHeartRate
          that.data.tips.lowestRespiratoryRate = data.lowestRespiratoryRate
          that.data.tips.highestRespiratoryRate = data.highestRespiratoryRate
          that.data.tips.highestHeartRateTime = data.highestHeartRateTime
          that.data.tips.highestRespiratoryRateTime = data.highestRespiratoryRateTime
          that.data.tips.lowestHeartRateTime = data.lowestHeartRateTime
          that.data.tips.lowestRespiratoryRateTime = data.lowestRespiratoryRateTime
          that.setData({
            tips: that.data.tips
          })
        }else{
          wx.showToast({
            title: '暂无数据',
            icon:"none"
          })
          chart.changeData([])
          that.data.tips.highestHeartRate = ""
          that.data.tips.lowestHeartRate = ""
          that.data.tips.lowestRespiratoryRate = ""
          that.data.tips.highestRespiratoryRate = ""
          that.data.tips.highestHeartRateTime = ""
          that.data.tips.highestRespiratoryRateTime = ""
          that.data.tips.lowestHeartRateTime = ""
          that.data.tips.lowestRespiratoryRateTime = ""
          that.setData({
            tips: that.data.tips
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
});