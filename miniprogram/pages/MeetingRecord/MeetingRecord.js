import {getRequest} from "../../request/request.js"
Page({


  data: {
    records:[],
    regularTime:null
  },

async getRecord(){
//http://47.107.110.112/consumer/meeting/getMeetingByOpenId/{openId}
  var res = await getRequest({
    url:"http://47.107.110.112/consumer/meeting/getMeetingByOpenId/"+wx.getStorageSync('openid')
  })
  this.setData({
    records:res.data.data,
    regularTime:this.GMTToStr(res.data.data[0].times)
  })
  console.log(this.GMTToStr(res.data.data[0].times))
},
  // onLoad: function (options) {
  //   this.getRecord()
  // },
   GMTToStr(time){
    var date = new Date(time)
    var Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes() + ':' + 
    date.getSeconds()
    return Str
},
  onShow: function () {
    this.getRecord()
  },

})