// pages/reportReading/reading/reading.js
var Dec = require('../../../utils/public.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    count_img:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  linkNav:function(e){
    this.showView()
  },
  showView: function () {
    // 显示遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideView: function () {
    // 隐藏遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //选择图片上传
  chooseImage:function(e){
    this.hideView()
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var filePath = res.tempFilePaths;//tempFilePaths类型StringArray，图片的本地文件路径列表
        that.setData({
          images: that.data.images.concat(filePath)
        });
        console.log(that.data.images)
        wx.showLoading({
          title: '图片上传中',
        });
        this.uploadFile(filePath);
      },
      fail:(res) =>{
        if(that.data.count_img){
          console.log("显示")
          that.showView();
        }
      }
    })
  },
  //上传文件
  uploadFile: function (data) {
    if (this.data.count_img.split(';').length >= 3) {
      wx.showToast({
        icon: "none",
        title: '最多勾选3张',
      });
      this.data.count_img = this.data.count_img.split(';').slice(0, 3).join(';')
      this.data.images = this.data.images.slice(0, 3)
      this.showView();
    } else {
      var that = this,
        zero = 0,
        i = data.i ? data.i : zero,
        success = data.success ? data.success : zero,
        fail = data.fail ? data.fail : zero
      wx.uploadFile({
        url: "https://www.tonticn.cn:8081/common/updatePhysicalReport",
        filePath: data[i],
        name: 'file',
        success: function (resp) {
          console.log(JSON.parse(Dec.Decrypt(resp.data.replace(/["]+/g, ''))))
          var photoName = JSON.parse(Dec.Decrypt(resp.data.replace(/["]+/g, '')))
          if (resp.statusCode == 200) {
            if (!resp.data || resp.data.indexOf("errcode") != -1) {
              var msg = "";
              try {
                var json = eval("(" + resp.data + ")");
                msg = '上传图片失败:' + json.errmsg;
              } catch (e) {
                msg = '上传图片失败'
              }
              fail++;
              wx.hideLoading();
            } else {
              success++
              //成功后的回调
              //自己的事件方法
              var imgName = photoName.result
              console.log(imgName)
              if (that.data.count_img.length) {
                that.data.count_img = that.data.count_img + ";" + imgName;
                console.log("存在")
              } else {
                that.data.count_img = imgName
                console.log("不存在")
              }
              if (i == (data.length - 1)) {
                wx.hideLoading();
              }
            }
          } else {
            if (i == (data.length - 1)) {
              wx.hideLoading();
            }
            console.log('上传图片失败');
          }
        },
        fail: function (res) {
          fail++;
          if (i == (data.length - 1)) {
            wx.hideLoading();
          }
        },
        complete: function () {
          i++;
          if (i == data.length) { //当图片传完时，停止调用  
            console.log(that.data.count_img)
            that.showView()
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            wx.hideLoading();
          } else { //若图片还没有传完，则继续调用函数
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadFile(data);
          }
        }
      });
    }
  },
  //解析图片
  fenxi: function (e) {
    var that = this;
    wx.showLoading({
      title: '图片分析中',
    })
    wx.request({//请求数据处理
      url: '/common/analysisphoto',
      method: "post",
      data: { 
        "photoName": that.data.count_img,
        "msg": app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        var reslut = JSON.stringify(res.result)
        wx.navigateTo({
          url: '../dataEnter/dataEnter?str=' + reslut + "&&images=" + that.data.images,
        });
        wx.hideLoading()
        that.hideView()
        that.data.images = []
        that.data.count_img = ""
      },
      fail: function (res) {
        wx.showToast({
          title: res,
        })
      }
    })
  },
  //连接历史记录
  navToHis:function(e){
    wx.navigateTo({
      url: '../hospital/hospital',
    })
  }
})