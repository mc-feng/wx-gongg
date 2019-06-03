// component/selectPeople/selectPeople.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showChoose:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log(e)
      var that = this;
      that.setData({
        index: e.detail.value
      });
      this.triggerEvent('myevent', e.detail.value)
    }
  }
})
