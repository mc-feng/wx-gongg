var app = getApp()
Page({
  data: {
    /**
        * 页面配置
        */
    riding: [{ "site": "医院总部：上海市金山区漕廊公路2901号", "project": "交    通：轨道交通一号线、三号线至上海南站下，转乘金山铁路至金山卫站，坐公交定班车或金山9路至复旦大学附属上海市公共卫生临床中心" }, {
      "site": "市区分部：上海市虹口区同心路921号（近水电路", "project": "交    通：公交66、140、823、862路公兴桥站下；115、933、966、942、829、817、866路同心路花园路站下；79、97、21路水电路广中路站下。" }],
    winWidth: 0,
    height: 1672,
    // tab切换
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})