// miniprogram/pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,    // 是否显示面板指示点
    autoplay: false,        // 自动播放
    duration: 500,          // 滑动动画时长
    indicatorColor: '#d8d8d8',       // 指示点颜色
    indicatorActiveColor: '#005dff', // 当前选中的指示点颜色
    circular: true,                  // 是否采用衔接滑动
    previousNextMargin: '70rpx',     // 前后边距，露出一小部分
    easingFunction: 'linear',         // 切换缓动动画类型
    protectList: [
      {
        cellTitle: '保护自己和他人不生病',
        cellIcon: 'smile-o',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '加强免疫',
        picObj: [
          'https://yanxuan.nosdn.127.net/2e02a1ef7f1afd969eed0dce80af8761.png',
          'https://yanxuan.nosdn.127.net/66d601c0c2ca3f44369934d7986753dc.png',
          'https://yanxuan.nosdn.127.net/6268f796d0e3a48af00546250f9ce6aa.png',
          'https://yanxuan.nosdn.127.net/67f1ac26ebce714608b1a91ab29ed385.png',
          'https://yanxuan.nosdn.127.net/489fb9a88788f130a05b6970babdc93f.png'
        ]
      },
      {
        cellTitle: '确保食品安全',
        cellIcon: 'goods-collect-o',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '健康采购',
        picObj: [
          'https://yanxuan.nosdn.127.net/5ba43f87f79cf2d1de8b6d5c8fc443bc.png',
          'https://yanxuan.nosdn.127.net/2e1314c344f9b576bd317c009e4820e4.png',
          'https://yanxuan.nosdn.127.net/e3ef591a33a244c595fe15ecd13929ac.png',
          'https://yanxuan.nosdn.127.net/f4a2a1503bd422f70806e0f6bcc58cd6.png',
          'https://yanxuan.nosdn.127.net/d6a2f6e0d042c817d2b83b497eeb48f4.png'
        ]
      },
      {
        cellTitle: '旅行时保持健康',
        cellIcon: 'logistics',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '安全出行',
        picObj: [
          'https://yanxuan.nosdn.127.net/7fd5d480e927b48ea24dd4957f9baed8.png',
          'https://yanxuan.nosdn.127.net/0a40d3bdfe57c4e1cb8962959f6cc926.png',
          'https://yanxuan.nosdn.127.net/97065651e8f9a15d53ecfa1304abf59a.png',
          'https://yanxuan.nosdn.127.net/06d84ff5cf8ec8bd15edc1c152e65373.png',
          'https://yanxuan.nosdn.127.net/9d47e831420417835f7d0d91fcb4fe47.png'
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 参考地址 https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
    wx.showLoading({
      title: '正加载喔...'
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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