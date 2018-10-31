const app = getApp()
Page({
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx） 
    list: [],
    loading:true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 
    this.initEleWidth();
    var that = this
    wx.request({
      url: '/medicalcard/getdoclist',
      data:{
        "openID": app.globalData.openId//openID
      },
      method:"post",
      success:function(res){
        that.setData({
          list: res.result,
          loading:false
        })
        console.log(res)
      }
    })
  },
  onReady: function () {
    // 页面渲染完成 
  },
  onShow: function () {
    // 页面显示 
  },
  onHide: function () {
    // 页面隐藏 
  },
  onUnload: function () {
    // 页面关闭 
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
      console.log(this.data.startX)
    }
  },
  initdata:function (that) {
    var list = that.data.list
    for (var i = 0; i < list.length; i++) {
      list[i].txtStyle = ""
    }
    that.setData({ list: list })
  },
  touchM: function (e) {
    console.log(e)
    var that = this
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变 
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离 
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项 
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态 
      this.setData({
        list: list
      });
    }
  },

  touchE: function (e) {
    console.log(e)
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/10，不显示删除按钮 
      var txtStyle = disX > delBtnWidth / 10 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态 
      this.setData({
        list: list
      });
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应 
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件 
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //数据库中删除
          console.log(that.data.list[e.target.dataset.index].docCode)
          wx.request({
            url: '/medicalcard/deletedoclist',
            method: "post",
            data: {
              "docID": that.data.list[e.target.dataset.index].docCode,
              "openID": app.globalData.openId//--openID
            },
            success: function (res) {
              console.log(res)
            }
          })
          //获取列表中要删除项的下标 
          var index = e.target.dataset.index;
          var list = that.data.list;
          //移除列表中下标为index的项 
          list.splice(index, 1);
          //更新列表的状态 
          that.setData({
            list: list
          });
        } else {
          this.initdata(that)
        }
      }
    })
  },
  // 点击跳转收藏预约
  linkToDetails:function(e){
    var index = e.currentTarget.dataset.index
    let str = JSON.stringify(this.data.list[index])
    console.log(str)
    wx.navigateTo({
      url: '../collectdetails/collectdetails?data='+str,
    })
  }

}) 