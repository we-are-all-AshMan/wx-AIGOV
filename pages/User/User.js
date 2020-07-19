import {getRequest} from "../../request/request.js"
import {login} from "../../utils/asyncWx.js"
Page({
  data: {
  // 用户信息
  userInfo:[],
  },
  test(){
    wx.getUserInfo({
      success(e)
      {
        console.log(e);
        //获取缓存中的openid
        console.log(wx.getStorageSync('openid'))
        console.log(wx.getStorageSync('userInfo'))
      }
    })
  },
  handleLogin(e){
    var that = this
    console.log(e);
    let  {userInfo} = e.detail;
    //将获取到的用户信息保存到 缓存中
    wx.setStorageSync('userInfo', userInfo);
    this.setData({userInfo});
    this.getCode().then(function(){
      that.getOpenid().then(function(){
        that.getTeleIfo()
      })
    })
 
  },
  async getCode(){
    var res =await  login()
    wx.setStorageSync('code', res.code)
    console.log(res);
  },
  async getOpenid(){
    var res = await  getRequest({
        url:"https://api.weixin.qq.com/sns/jscode2session",
        data:{
          "appid":"wxf260d1df29184604",
          "secret":"8ce117246fdeb88858902888dfdd5723",
          "js_code":wx.getStorageSync('code'),
          "grant_type":"authorization_code"
        }
      })
      console.log(res.data.openid);
      wx.setStorageSync('openid', res.data.openid);
  },
  async getTeleIfo()
  {
    var res1 = await getRequest({
      url:"http://47.115.15.249:85/consumer/login/select/"+wx.getStorageSync('openid')
    })
      console.log(res1.data.data.tel);
      wx.setStorageSync('telephone', res1.data.data.tel);
  },

  onShow() {
  
},
})