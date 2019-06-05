// pages/link/out/out.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = []
  // msgList = [{
  //   speaker: 'server',
  //   contentType: 'text',
  //   content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  // },
  // {
  //   speaker: 'customer',
  //   contentType: 'text',
  //   content: '我怕是走错片场了...'
  // }
  // ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    // 逐字加载效果
    // var story = "你好！\n我是你的专属麦麦医疗机器人管家，我容纳了包括疾病、药物、指标、症状等海量的医疗知识，为您在线解笞，麦麦还在不断学习当中，希望能为您答疑解惑。";
    // var i = 0;
    // var time = setInterval(function () {
    //   var text = story.substring(0, i);
    //   i++;
    //   that.setData({
    //     text: text
    //   });
    //   if (text.length == story.length) {
    //     clearInterval(time);
    //   }
    // }, 100)
    initData(this);
    // this.setData({
    //   cusHeadIcon: app.globalData.userInfo.avatarUrl,
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.show(this, 'slide_up1', 200, 0)
    setTimeout(function () {
      this.show(this, 'slide_up2', 200, 0)
    }.bind(this), 200);
    setTimeout(function () {
      this.show(this, 'slide_up3', 200, 0)
    }.bind(this), 400);
    setTimeout(function () {
      this.show(this, 'slide_up4', 200, 0)
    }.bind(this), 700);
    setTimeout(function () {
      this.show(this, 'slide_up5', 200, 0)
    }.bind(this), 1100);
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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    console.log(e)
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
    inputVal = e.detail.value
    if (inputVal) {
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: inputVal
      })
      this.sendMessage(inputVal, this)
      inputVal = '';
      this.setData({
        msgList,
        inputVal
      });
    } else {
      return
    }
  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    // var message = e.detail.value
    // msgList.push({
    //   speaker: 'customer',
    //   contentType: 'text',
    //   content: message
    // })
    // inputVal = '';
    // this.setData({
    //   msgList,
    //   inputVal
    // });
    // this.sendMessage(message, this)
  },
  // 渐入渐出效果
  show: function (that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  // 开始点击问题
  linkToMessage:function(res){
    console.log(res.currentTarget.dataset.message)
    var message = res.currentTarget.dataset.message
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: message
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
    this.sendMessage(message,this)
  },
  //发送服务消息
  sendMessage:function(vaule,that){
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: '/common/getMaiMaiAnswerAnon',
      method:"post",
      data:{
        msg:vaule
      },
      success: function (res) {
        console.log(res)
        if (res.result.data!=null){
          msgList.push(res.result.data)
          that.setData({
            msgList
          });
        }else{
          var list = { list: [{ type:"gossip"}]}
          msgList.push(list)
          that.setData({
            msgList
          });
        }
      },
      complete:function(res){
        wx.hideLoading()
      }
    })
  },
  //到详情页
  linkDetail:function(res){
    console.log(res)
    var result = res.currentTarget.dataset;
    var httpCode = encodeURIComponent(result.id);
    var msg = result.type;
    var value = result.value
    if (msg=="drug"||msg=="index"||msg=="disease"){
      wx.navigateTo({
        url: '../outDetail/outDetail?id=' + httpCode + "&&msg=" + msg + "&&value=" + value,
      })
    }
  },
  //发送内容
  sendMsg:function(res){
    console.log(inputVal)
    if (inputVal){
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: inputVal
      })
      this.sendMessage(inputVal, this)
      inputVal = '';
      this.setData({
        msgList,
        inputVal
      });
    }else{
      return
    }
  },
  //查看更多内容
  linkeMore:function(res){
    var list = res.currentTarget.dataset.list
    list.map((item)=>{
      item.show_id = encodeURIComponent(item.show_id)
    })
    console.log(list)
    var trans = JSON.stringify(list)
    wx.navigateTo({
      url: '../outMore/outMore?list=' + trans,
    })
  }
})