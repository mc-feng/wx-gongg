// index.js
import F2 from '../../../component/f2-canvas/lib/f2';
var util = require('../../../utils/util.js');
let chart = null;
function initChart(canvas, width, height) { // 使用 F2 绘制图表
   var data = []
   chart = new F2.Chart({
    el: canvas,
    padding: [45, 'auto', 'auto'],
    width:370,
    height:377
  });
  chart.source(data,{
    temperature: {
      tickCount: 10,
      formatter: function formatter(val) {
        return val.toFixed(2) + '℃';
      }
    },
    dateTime: {
      range:[0, 1],
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
    onShow: function onShow(ev) {
      const { items } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
    }
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
  chart.area().position('dateTime*temperature');
  chart.line().position('dateTime*temperature');
  chart.render();
  return chart;
}

Page({
  data: {
    opts: {
      onInit:  initChart
    },
    date:"",
    nowTime:"",//现在时间
    tems:"",
    time:"",
    content:""
  },
  onLoad(e){
    console.log(e.patId)
    this.data.patId = e.patId
    this.getDate()
  },
  onShow(){
    var that = this;
    setTimeout(()=>{
      that.finde()
    },200)
  },
  onReady() {
  },
  getDate(){//获取时间
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var nowTime = util.formatTimeTwo(timestamp, "Y-M-D");
    console.log(nowTime)
    this.getData(nowTime)
    this.setData({
      date: nowTime,
      nowTime: nowTime
    })
  },
  bindDateChange(e){//改变日期
    this.setData({
      date: e.detail.value
    })
  },
  finde() {//查找数据
    console.log(this.data.date)
    this.getData(this.data.date)
  },
  getData(date){//获取数据
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '/hospitalization/temperatureHistory',
      method:"post",
      data:{
        caseNum: this.data.patId,
        startDate: date
      },
      success(res){
        if(res.success&&res.data){
          console.log(res.data)
          // that.drawLine(res.data.highAlert, res.data.lowAlert)
          if (chart.changeData){
            chart.changeData(res.data.list)
          }
          that.setData({
            tems: res.data.highestTemperature,
            time: res.data.highestTemperatureTime,
            content: res.data.highestTemperatureCount
          })
        }else{
          wx.showToast({
            title: '暂无数据',
            icon:"none"
          })
          chart.changeData([])
          that.setData({
            tems: "",
            time: "",
            content: ""
          })
        }
      },
      complete(){
        wx.hideLoading()
      }
    })
  }
  // drawLine(data,data2){//画高低温线
  //   console.log(data)
  //   chart.guide().line({
  //     start: ['min', data],
  //     end: ['max', data],
  //     style: {
  //       stroke: '#FF9B9B',
  //       lineWidth: 1,
  //       lineCap: 'round',
  //       lineDash: [15]
  //     }
  //   });
  //   chart.guide().text({ // 绘制辅助文本
  //     position: ['max', data],
  //     content: '高温预警：'+ data+"℃",
  //     offsetY: -5,
  //     style: {
  //       fill: '#FF9B9B',
  //       textAlign: 'end',
  //       textBaseline: 'bottom'
  //     }
  //   });
  //   chart.guide().line({
  //     start: ['min', data2],
  //     end: ['max', data2],
  //     style: {
  //       stroke: '#4091FF',
  //       lineWidth: 1,
  //       lineCap: 'round',
  //       lineDash: [15]
  //     }
  //   });
  //   chart.guide().text({ // 绘制辅助文本
  //     position: ['max', data2],
  //     content: '低温预警：' + data2 + "℃",
  //     offsetY: -5,
  //     style: {
  //       fill: '#4091FF',
  //       textAlign: 'end',
  //       textBaseline: 'bottom'
  //     }
  //   });
  // }
});