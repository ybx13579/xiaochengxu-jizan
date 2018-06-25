//app.js
App({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分享转发按钮
    wx.showShareMenu({
      withShareTicket: true//显示转发按钮
    })
    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console(res.userInfo)

    //           //缓存用户昵称
    //           var userNameTxt = this.globalData.userInfo.nickName
    //           var userName = wx.getStorageSync('userName') || []
    //           wx.setStorageSync('userName', userNameTxt)
    //         }
    //       })
    //     }
    //   }
    // })

  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //存储公共api头部
    var url = wx.getStorageSync('url') || []
    var urls = 'http://www.rongyan.ren/'
    wx.setStorageSync('url', urls)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           //console.log(this)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }

    //            //缓存用户昵称
    //            var userNameTxt = this.globalData.userInfo.nickName
    //            var userName = wx.getStorageSync('userName') || []
    //            wx.setStorageSync('userName', userNameTxt)
    //         }
    //       })
    //     }else{
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console(res.userInfo)
    //           //缓存用户昵称
    //           var userNameTxt = this.globalData.userInfo.nickName
    //           var userName = wx.getStorageSync('userName') || []
    //           wx.setStorageSync('userName', userNameTxt)
    //         }
    //       })
    //     }
    //   }
    // })


  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    urlAddressInfo:"https://www.rongyan.ren/",
  }
})