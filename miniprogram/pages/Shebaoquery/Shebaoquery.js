import {getRequest} from "../../request/request.js"

Page({

  
  data: {
    state:0,
    ifo:[]
  },
  async getCurrentState(){
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/socialSecurityCard/getSocialSecurityCardByOpenId/"+wx.getStorageSync('openid')    
    })
    console.log(res);
    this.setData({
      state:res.data.data.state,
      // state:4,
      ifo:res.data.data
    })
  },
  async  destoryCard(){
    // http://47.115.15.249:81/consumer/socialSecurityCard/delete/{openId}
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/socialSecurityCard/delete/"+wx.getStorageSync('openid')    
    })
    console.log(res)
    wx.navigateTo({
      url: '../../pages/Shebao/Shebao'
    })
  },
  gotoHandle(){
    wx.redirectTo({
      url: '../../pages/Shebao2/Shebao2'
    })
  },
  onLoad:function(options){
    this.getCurrentState()
  },

  })