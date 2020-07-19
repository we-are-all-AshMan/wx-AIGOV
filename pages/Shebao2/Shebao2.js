import {getRequest} from "../../request/request.js"
Page({

  data: {
    name:"",
    socialSecurityNumber:"",
    socialSecurityCardNumber:""
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
    url:"http://47.115.15.249:81/consumer/socialSecurityCard/create?openId="+wx.getStorageSync('openid')+"&name="+this.data.name+"&socialSecurityNumber="+this.data.socialSecurityNumber+"&socialSecurityCardNumber="+this.data.socialSecurityCardNumber+"&state=0" 
  })
  console.log(res)
  wx.navigateTo({
    url: '../../pages/Shebaoquery/Shebaoquery'
  
  })
  }
  
})