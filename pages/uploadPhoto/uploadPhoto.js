/**
 * 暂定：
 * 切换的背景图比例是5：9
 * 用户上传的图片比例是4：3
 * data中的图片为默认图（canvas不放默认图会报错）
 */
import WeCropper from '../we-cropper/we-cropper.js'//裁切图片
const device = wx.getSystemInfoSync()

const width = device.windowWidth
const height = device.windowHeight-50


var that;
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: 20,// 裁剪框x轴起点
        y: (height - 300) / 2, // 裁剪框y轴起点
        width: width-40,
        height: (width-40) / 1.33333,
      }
    },
    bodyHeight: "",//屏幕高度
    showCJBox:'',//显示裁切组件
    CJImgFinishSrc:'',//用户上传图片裁切后的图片../../img/timg3.jpeg
    imgBgList:'',//要切换的背景图列表
    bigImg:'../../img/bg1.jpg',//展示的大背景图
    smallImg: '../../img/timg3.jpeg',//展示的小图 用户自己上传的图
    canvasBigImg: '../../img/bg3.jpg',//canvas中的大背景图
    canvasSmallImg:'../../img/timg3.jpeg',//canvas中的大背景图
    changeBgActive:'0',//默认选择的背景图是第一个
  },
  //裁切图片
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  //用户自己上传的图片
  getCropperImage() {
    var that = this;
    that.setData({
      showCJBox: false
    });
    that.wecropper.getCropperImage((src) => {
      if (src) {
        that.setData({
          CJImgFinishSrc: src,
          canvasSmallImg: src, 
          smallImg:src
        });
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  //生成图片部分的 大背景切换事件
  changeBg: function (res) {
    var that = this;
    var idx = parseInt(res.currentTarget.dataset.index);
    var thatSrc = that.data.imgBgList[idx];
    that.setData({
      bigImg: thatSrc,
      canvasBigImg: thatSrc,
      changeBgActive:idx
    });
  }, 
  //裁切组件内点击选择照片
  uploadTap() {
    const that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        that.wecropper.pushOrign(src)
      }
    })
  },
  //裁切图片 end
  onLoad: function (options) {
    that = this; 
    var objectId = options.objectId; 
    //生成图片背景列表
    that.setData({
      imgBgList: ["../../img/bg1.jpg", "../../img/bg2.jpg", "../../img/bg3.jpg", "../../img/bg4.jpg", "../../img/bg2.jpg", "../../img/bg3.jpg", "../../img/bg4.jpg"]
    })
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          bodyHeight: res.windowHeight
        })
        //console.log(res.windowHeight)
      },
    })
    //裁切图片
    const { cropperOpt } = this.data
    new WeCropper(cropperOpt)
      .on('ready', function (ctx) {
        //console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        //console.log(`before picture loaded, i can do something`)
        //console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        //console.log(`picture loaded`)
        //console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })

  },
  //显示裁剪图片蒙版
  showCJBox: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], //, 'compressed' 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        //显示隐藏的裁切组件
        that.setData({
          showCJBox: true
        });
        //填选择后的图片进canvas
        const src = res.tempFilePaths[0]
        that.wecropper.pushOrign(src)
      }
    })
  }, 
  //绘制海报
  handlePoster(e) {
    var that = this;
    //绘制大图图片
    const ctx = wx.createCanvasContext('bigImgCanvas');
    ctx.clearRect(0, 0, 0, 0);
    const arr2 = [that.data.canvasBigImg, that.data.canvasSmallImg];    // 有图片海报背景图&&海报正文图片this.data.nodesData[index].detail_pic
    // const WIDTH = 300;
    // const HEIGHT = 553;
    const WIDTH = 600;
    const HEIGHT = 1080;
    //  绘制图片模板的 底图 和 用户上传的图
    ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);
    ctx.drawImage(arr2[1], (WIDTH - WIDTH * 0.8) / 2, 200, WIDTH * 0.8, (WIDTH * 0.8) / 1.333333);
    // //文字
    // ctx.setFontSize(32);
    // ctx.setFillStyle('#FFFFFF');
    // ctx.fillText("当生活变的千篇一律，与其墨守成规，不如做回自己", (WIDTH - WIDTH * 0.8) / 2, 100, WIDTH * 0.8);

    ctx.draw();


    //保存图片到手机相册
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'bigImgCanvas',
        fileType: 'jpg',
        success: function (res) {
          wx.previewImage({
            current: res.tempFilePath, // 当前显示图片的http链接
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })
        }
      })
    }, 500);
    wx.getUserInfo({    //获取微信用户信息
      success: function (res) {
        this.getImageInfo(res.userInfo.avatarUrl);  //  调取图片处理方法
        this.setData({
          userName: res.userInfo.nickName
        });
      }
    });
    wx.getSetting({  // 获取用户设置
      success(res) {

        wx.showToast({
          title: '正在生成...',
          icon: 'loading',
          duration: 2000
        })
        // if (!res.authSetting['scope.writePhotosAlbum']) {  // 如果用户之前拒绝了授权
        //   wx.openSetting({
        //     success(tag) {
        //       if (tag.authSetting["scope.writePhotosAlbum"]) {  // 用户在设置页选择同意授权
        //         wx.showLoading({
        //           title: '正在生成...',
        //         })
        //       }
        //     }
        //   });
        // } else {   //  用户已经授权
        //   wx.showLoading({
        //     title: '正在生成...',
        //   })
        // }
      }
    })
  }
})