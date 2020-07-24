import {getRequest} from "../../request/request.js"
const { $Message } = require('../../dist/base/index');
Page({
  data: {
    visible1: false,
    NowClickIndex:-1,
    NowClickOb:null,
    list:[],
    message:""

  },
  async getETCIfo(){
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/etc/select/"+wx.getStorageSync('openid')
    })
    console.log(res)
    this.setData({
      list:res.data.data
    })
    // console.log(this.data.list[0])
  },
  handleClose1 () {
    this.setData({
        visible1: false
    });
},
handleOpenDetail(e){
  console.log(e)
  this.setData({
    visible1:true,
    NowClickIndex:e.currentTarget.dataset.index,
  })
  var index = this.data.NowClickIndex
  this.setData({
    NowClickOb:this.data.list[index]
  })
},
  onLoad:function(options){
    this.getETCIfo();
  }
})