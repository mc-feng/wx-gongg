// pages/individalService/survey/survey.js
Page({
  data: {
    chooseData: [
{ title: "1、目前小程序是否解决了你的预约挂号付费等就医流程问题？", choose: [{ name: '1', value: '是' }, { name: '0', value: '否' }], change: "radioChange" }, 
{ title: "2、小程序线上预约挂号是否节约了你的大部分排队时间？", choose: [{ name: '1', value: '是' }, { name: '0', value: '否' }], change: "radioChange2" },
{ title: "3、小程序目前使用过程中是否稳定？", choose: [{ name: '1', value: '是' }, { name: '0', value: '否' }], change: "radioChange3" },
{ title: "4、生活号的操作流程是否复杂？", choose: [{ name: '1', value: '是' }, { name: '0', value: '否' }], change: "radioChange4" }, 
      { title: "5、你希望小程序可以进行哪些改造？", choose: [{ name: 'A', value: 'A.多加功能' }, { name: 'B', value: 'B.客服系统完善' }, { name: 'C', value: 'C.其他' }], change: "radioChange5" },
      { title: "6、您对小程序最不满意的是什么？？", choose: [{ name: 'A', value: 'A.操作复杂' }, { name: 'B', value: '稳定性不够' }, { name: 'C', value: 'C.功能不足' }, { name: 'D', value: 'D.其他' }], change: "radioChange6" }],
    value:[],
  },
  radioChange: function (e) {
    this.data.value[0] = e.detail.value
  },
  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.value[1] = e.detail.value
  },
  radioChange3: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.value[2] = e.detail.value
  },
  radioChange4: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.value[3] = e.detail.value
  },
  radioChange5: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.value[4] = e.detail.value
  },
  radioChange6: function (e) {
    this.data.value[5] = e.detail.value
    console.log('radio发生change事件，携带value值为：', this.data.value)
  }
})