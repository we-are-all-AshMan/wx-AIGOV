import {getRequest} from "../../request/request.js"

Page({

  data: {
    state:0,
    ifo:[]
  },
  async getCurrentState(){
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/identity/getIdentityByOpenId/"+wx.getStorageSync('openid')    
    })
    console.log(res.data.data);
    this.setData({
      state:res.data.data.state,
      // state:4,
      ifo:res.data.data
    })
  },
  gotoHandle(){
    wx.redirectTo({
      url: '../../pages/HandleAffair/HandleAffair'
    })
  },
  onLoad: function (options) {
    this.getCurrentState()
  },

  
})