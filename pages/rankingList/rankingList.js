// pages/myHomePage/myHomePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phbList:[{
      index:'',
      src:'',
      name:'',
      numb:''
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(that)
    wx.showShareMenu({
      withShareTicket: true//显示转发按钮
    })
    that.setData({
      phbList: [{
          src: '../../img/bg1.jpg',
          name: '没有挽留',
          numb: '1531'
        },
        {
          src: '../../img/bg2.jpg',
          name: '一口一个大包子',
          numb: '337'
        },
        {
          src: '../../img/bg3.jpg',
          name: '我就让ni猜我的名字有多长',
          numb: '42'
        },
    ],
    })
  },

  //分享
  onShareAppMessage: function (options) {
    var that = this;
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