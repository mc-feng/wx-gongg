// pages/reportReading/dataEnter/dataEnter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportId:"",
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,
    selectData2:[],
    index2: 0,
    unit:"",//单位
    referenceValue:"",//范围
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result = JSON.parse(options.str)
    console.log(result)
    var datas = result.data
    var ocrResult = datas.ocrResult;
    var checkTime = ocrResult.checkTime;
    var checkName =[];
    var hospitalName = ocrResult.hospitalName;
    var reportResult = ocrResult.indexDetailArray;
    var photoName = result.photoName;
    for (var i = 0; i < reportResult.length;i++){
      reportResult[i].indexArray.map((item, index, arr) => {item.check = false} )
      checkName.push({ name: reportResult[i].checkName, id: reportResult[i].basReportId})
    }
    console.log(reportResult)
    this.setData({
      checkTime: checkTime,
      hospitalName: hospitalName,
      reportResult: reportResult,
      datas: datas,
      photoName:photoName,
      selectData: checkName
    })
    //判断是否是从历史记录进来
    if (options.reportId){
      let reportId = options.reportId;
      let timestamp = options.timestamp;
      console.log(options)
      let hosArr = result.photoName.split(";");
      for (let i = 0; i < hosArr.length;i++){
        // hosArr[i] = "http://118.31.14.197:8081/"+hosArr[i]
        hosArr[i] = "https://www.tonticn.cn:8081/" + hosArr[i]
      }
      console.log(hosArr)
      if (timestamp == "null"){
        this.setData({
          images: hosArr,
          reportId: reportId
        })
      }else{
        this.setData({
          images: hosArr,
          reportId: reportId,
          timestamp: timestamp
        })
      }
    }else{
      var images = options.images.split(",")
      console.log(images)
      this.setData({
         images: images
      })
    }
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
  //控制范围是否隐藏
  changeFanwei:function(e){
    var index = e.currentTarget.dataset.index;
    var big = e.currentTarget.dataset.big;
    this.data.reportResult[big].indexArray[index].check = !this.data.reportResult[big].indexArray[index].check
    this.setData({
      reportResult: this.data.reportResult
    })
  },
  //保存数据
  saveData:function(e){
    var index = e.currentTarget.dataset.index;
    var big = e.currentTarget.dataset.big;
    var value = e.detail.value
    this.data.reportResult[big].indexArray[index].value = value
  },
  //保存检查时间
  saveCheckTime:function(e){
    var value = e.detail.value
    this.data.checkTime = value
  },
  //保存医院名
  saveHospitalName:function(e){
    var value = e.detail.value
    console.log(value)
    this.data.hospitalName = value
  },
  //提交保存
  submit:function(e){
    this.data.datas.ocrResult.indexDetailArray = this.data.reportResult;
    this.data.datas.ocrResult.checkTime = this.data.checkTime;
    this.data.datas.ocrResult.hospitalName = this.data.hospitalName;
    var that = this
    wx.request({
      url: '/common/saveAnalysisReport',
      method:"post",
      data:{
        data: that.data.datas,
        openId: app.globalData.openId,
        photoName: that.data.photoName,
        reportId: that.data.reportId
      },
      success:function(res){
        if(res.success == true){
          wx.showModal({
            title: '保存成功',
            content: '可在历史记录中查询',
            success(res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }else{
          wx.showModal({
            title: '保存失败',
            content: '请退出重试',
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  },
  //提交解读
  reading:function(){
    this.data.datas.ocrResult.indexDetailArray = this.data.reportResult
    this.data.datas.ocrResult.checkTime = this.data.checkTime;
    this.data.datas.ocrResult.hospitalName = this.data.hospitalName;
    console.log(this.data.datas)
    console.log(this.data.photoName)
    var that = this
    wx.showLoading({
      title: '报告分析中',
    })
    wx.request({
      url: '/common/analysisreport',
      method: "post",
      data: {
        data: that.data.datas,
        openId: app.globalData.openId,
        photoName: that.data.photoName,
        reportId: that.data.reportId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if(res.success == true){
          if (res.result.httpCode == 200) {
            var data = JSON.stringify(res.result.data)
            wx.showToast({
              title: '解读成功',
            })
            wx.redirectTo({
              url: '../analysis/analysis?data=' + data,
            })
          } else {
            wx.showToast({
              icon:"none",
              title: '解读失败请换一张图片',
            })
          }
        }else{
          wx.showToast({
            title: '图片解析错误',
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: "网络原因解析失败",
        })
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    var that = this
    var src = e.currentTarget.dataset.src;//获取data-src
    var index = e.currentTarget.dataset.index
    // 预览图集
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: that.data.images// 需要预览的图片http链接列表  
    });
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
      selectData2: [],
      toastData: ""
    })
    setTimeout(function () {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 点击项目下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击项目下拉列表
  optionTap(e) {
    let that = this
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: '/common/modifyreport',
      method:"post",
      data:{
        httpCode: that.data.selectData[Index].id
      },
      success:function(res){
        wx.hideLoading()
        console.log(res.result.data.reportArray[0].indexArray)
        if(res.success){
          var xiangData = res.result.data.reportArray[0].indexArray
          that.setData({
            selectData2: xiangData
          })
        }else{
          wx.showToast({
            title: '获取失败',
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },
  // 点击下拉显示框
  selectTap2() {
    this.setData({
      show2: !this.data.show2
    });
    var that = this
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      console.log(res[0].height);
      that.setData({
        sHeight2: res[0].height
      })
    })
  },
  // 点击下拉列表
  optionTap2(e) {
    let that = this
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index2: Index,
      show2: !this.data.show2
    });
  },
  //保存模态框数据
  saveToastData:function(e){
    var value = e.detail.value
    this.setData({
      toastData: value
    })
  },
  //模态框确认
  confirmToast:function(res){
    var index = this.data.index
    var index2 = this.data.index2
    var name = this.data.selectData2[index2].indexName
    var value = this.data.toastData
    var unit = this.data.selectData2[index2].unit
    var unitList = this.data.selectData2[index2].unitList
    var type = this.data.selectData[index].name
    var index_id = this.data.selectData2[index2].indexCode
    var referenceValue = this.data.selectData2[index2].referenceValue
    var originName = this.data.selectData2[index2].indexName
    var text = this.data.selectData2[index2].indexName
    if (name && value){
      this.data.reportResult[index].indexArray.push({name: name, value: value, unit: unit, unitList: unitList, type: type, index_id: index_id, referenceValue: referenceValue, originName: originName, text: text, error_tip
          : "0", indexAnomaly:""})
      this.data.reportResult[index].indexArraySize = this.data.reportResult[index].indexArray.length.toString()
      this.setData({
        reportResult: this.data.reportResult
      })
      console.log(this.data.reportResult)
      this.hideView()
    }else{
      wx.showToast({
        title: '请将数据填写完整',
      })
    }
  },
  //继续添加
  cattyToast:function(res){
    var index = this.data.index
    var index2 = this.data.index2
    var name = this.data.selectData2[index2].indexName
    var value = this.data.toastData
    var unit = this.data.selectData2[index2].unit
    var unitList = this.data.selectData2[index2].unitList
    var type = this.data.selectData[index].name
    var index_id = this.data.selectData2[index2].indexCode
    var referenceValue = this.data.selectData2[index2].referenceValue
    var originName = this.data.selectData2[index2].indexName
    var text = this.data.selectData2[index2].indexName
    if (name && value) {
      this.data.selectData2[index2].name = name
      this.data.selectData2[index2].value = value
      this.data.reportResult[index].indexArray.push({name: name, value: value, unit: unit, unitList: unitList, type: type, index_id: index_id, referenceValue: referenceValue, originName: originName, text: text, error_tip
          : "0", indexAnomaly: ""})
      this.setData({
        reportResult: this.data.reportResult,
        selectData2: [],
        toastData:""
      })
      wx.showToast({
        title: '添加完成请继续',
      })
    } else {
      wx.showToast({
        title: '请将数据填写完整',
      })
    }
  },
  //历史记录解读
  readinged:function(){
    var that = this
    wx.showLoading({
      title: '报告分析中',
    })
    wx.request({
      url: '/common/getDetailedReport',
      method:"post",
      data:{
        msg: that.data.reportId
      },
      success:function(res){
        wx.hideLoading()
        console.log(res)
        if (res.result.httpCode == 200) {
          var data = JSON.stringify(res.result.data)
          wx.showToast({
            title: '解读成功',
          })
          wx.navigateTo({
            url: '../analysis/analysis?data=' + data,
          })
        } else {
          wx.showToast({
            title: '解读失败',
          })
        }
      },
      fail:function(){
        wx.hideLoading();
        wx.showToast({
          title: "网络原因解析失败",
        })
      }
    })
  }
})