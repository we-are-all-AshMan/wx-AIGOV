// pages/User.js
Page({
  data: {
  // 用户信息
  userInfo:[],
  },
  onShow() {
    //获取缓存中的 用户信息
    let userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo)
      this.setData({
        userInfo
      });
    
      },
        //跳转到登录页面
    handleLogin(e) {
      // wx.navigateTo({
      //     url: '/pages/login/index',
      // });
        // 获取用户信息
        let  {userInfo} = e.detail;
        //将获取到的用户信息保存到 缓存中
        wx.setStorageSync('userInfo', userInfo);
        this.setData({userInfo});
        console.log(userInfo);
  },
})