import {getRequest} from "../../request/request.js"
import Toast from '../../van-dist/toast/toast';
Page({


  data: {
    title:"",
    times:null,
    contexts:""

  },
  saveRecord()
  {

  },
 async deleteRecord(){
   var that = this
    //http://47.107.110.112/consumer/meeting/deleteMeeting
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/meeting/deleteMeeting?openId="+wx.getStorageSync('openid')+"&title="+that.data.title
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        Toast.success('删除成功');
            },
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title:options.title
    })
    this.getcontent()
  },
  async getcontent(){
    var that = this
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/meeting/getMeetingByOpenIdAndTitle?openId="+wx.getStorageSync('openid')+"&title="+that.data.title
    })
    console.log(res.data.data[0])
    that.setData({
      times:res.data.data[0].times,
      contexts:res.data.data[0].contexts
    })
  }
  
})