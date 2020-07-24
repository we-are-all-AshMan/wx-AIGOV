import {getRequest} from "../../request/request.js"
import Toast from '../../van-dist/toast/toast';

Page({
  data: {
    name:"",
    socialSecurityNumber:"",
    socialSecurityCardNumber:"",
    state:-1,
  },
  updateNameValue(e){
    this.setData({
      name:e.detail.value
    })
  },
  updatesocialSecurityNumberValue(e){
    this.setData({
      socialSecurityNumber:e.detail.value
    })
  },
  updatesocialSecurityCardNumberValue(e){
    this.setData({
      socialSecurityCardNumber:e.detail.value
    })
  },
 async startUse(){
    // http://47.115.15.249:81/consumer/socialSecurityCard/create
    // openId=&name=&socialSecurityNumber=&socialSecurityCardNumber=&state=      state就是查到的状态 
  var res = await getRequest({
    url:"http://47.107.110.112/consumer/socialSecurityCard/create?openId="+wx.getStorageSync('openid')+"&name="+this.data.name+"&socialSecurityNumber="+this.data.socialSecurityNumber+"&socialSecurityCardNumber="+this.data.socialSecurityCardNumber+"&state=0" 
  })
  console.log(res)
  wx.navigateTo({
    url: '../../pages/Shebaoquery/Shebaoquery'
  
  })
  },
  async getUserState(){
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/socialSecurityCard/getSocialSecurityCardByOpenId/"+wx.getStorageSync('openid')    
    })
    console.log(res)
    this.setData({
      state:res.data.data.state
    })
    // console.log(this.data.state)
  },
  onLoad:function(options){
    var that =this
    this.getUserState().then(function(){
      console.log(that.data.state)
      if(that.data.state!=0)
      {
        Toast.fail('您已经办理过相关业务');
        setTimeout(() => {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
      }, 2000);
     
        // wx.redirectTo({
        //   url: '../../pages/Shebaoquery/Shebaoquery'
        // })
      }

    })
   
  }
  })