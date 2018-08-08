// pages/myHomePage/myHomePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zan: true,
    //qxzan: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true//显示转发按钮
    })
  },
  /**
   * 点赞小心心换颜色
   */
  zan: function (e) {
    this.setData({
      zan: false,
      qxzan: true,
    })
  },
  qxzan: function (e) {
    this.setData({
      zan: true,
      qxzan: false,
    })
  },

  //分享
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "快来一起Pick我的桌面吧~",        // 默认是小程序的名称(可以写slogan等)
      //path: '/page/index/index/user?id=123',        // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '../../img/timg3.jpeg',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function (res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
          console.log("用户取消转发");
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      },
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      //var eData = options.target.dataset;
      //console.log(eData.name);     // shareBtn
      // 此处可以修改 shareObj 中的内容
      //shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
    }
    　　// 返回shareObj
    　　return shareObj;
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


})