// component/selectDate/selectDate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date:String,
    date2:String,
    nowTime:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //选择开始日期
    bindDateChange(e) {
      console.log(e.detail.value)
      var startDate = e.detail.value
      this.setData({
        date: startDate
      })
    },
    bindDateChange2(e) {
      var endDate = e.detail.value
      this.setData({
        date2: endDate
      })
    },
    sendDate(){
      this.triggerEvent('acdata', this.data)
    }
  }
})
