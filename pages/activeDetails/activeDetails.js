// pages/activeDetails/activeDetails.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,//前两个菜单样式切换
    selected1: false,

    toView: '',//锚点

    bodyHeight: "",//屏幕高度
    scroll_height:"",//到顶部的距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          bodyHeight: res.windowHeight
        })
      },
    })
  },
  scroll: function (e) {
    var that = this;
    // console.log(e.detail.scrollTop)
    that.setData({
      scroll_height: e.detail.scrollTop
    })  
  },
  /**
   * 前两个菜单切换 事件
   */
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })

    // 获取标签元素上自定义的 data-opt 属性的值
    let target = e.currentTarget.dataset.opt;
    this.setData({
      toView: target
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })

    // 获取标签元素上自定义的 data-opt 属性的值
    let target = e.currentTarget.dataset.opt;
    this.setData({
      toView: target
    })
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
  
  }
})