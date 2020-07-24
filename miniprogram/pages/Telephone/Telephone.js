import {getRequest} from "../../request/request.js";
import Dialog from '../../van-dist/dialog/dialog';
const { $Toast } = require('../../dist/base/index');
Page({
  data: {
    //是否已经绑定，如果没有则绑定
    //如果已经绑定则进行更换手机号的操作
    isbinded:false,
    //设置一个变量指向是否正在发送验证码
    isSending:false,
    phone:"",
    sms:"",
    rightsms:""
  },
  phoneContact(value){
    // console.log(value.detail)
    this.setData(
      {
        phone:value.detail
      }
    )
  },
  smsContact(value){
    this.setData(
      {
        sms:value.detail
      }
    )
  },
  //点击发送验证码
 async handleClick(){
    var that = this;
    if(this.data.phone.length<11)
    {
      $Toast({
        content: '电话号码不符合规范',
        type: 'warning'
    });
    }
    else{
      var res = await getRequest({
        url:"http://47.107.110.112/consumer/login/sendMessageCode/"+that.data.phone
      })
      console.log(res);
      this.setData({
        isSending:true,
        rightsms:res.data.data
      })
    }
  },
  //获取是否已绑定的信息
  async getBindedstate(){
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/login/select/"+wx.getStorageSync('openid')
    })
    console.log(res);
    if(res.data.message.indexOf("没有")!=-1){
      this.setData({
        isbinded:false
      })
    }
    if(res.data.message.indexOf("没有")==-1){
      this.setData({
        isbinded:true,
        phone:res.data.data.tel
      })
    }
  },
  async postUserIfo()
  {
      var that = this;
        // console.log(wx.getStorageSync('openid'))
        // console.log(wx.getStorageSync('userInfo'))
        const openid = wx.getStorageSync('openid');
        const ifo = wx.getStorageSync('userInfo');
        console.log(openid)
        console.log(ifo)
 // http://47.115.15.249:85/consumer/login/createUser?imageUrl=&&openId=&&tel=&&userName=
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/login/createUser?imageUrl="+ifo.avatarUrl+"&&openId="+openid+"&&tel="+that.data.phone+"&&userName="+ifo.nickName
    })
    console.log(res);
  },
  resetBindPhone(){
    this.setData({
      isbinded:false
    })
  },
  bindPhone()
  {
    if(this.data.sms==this.data.rightsms&&this.data.sms!="")
    {
     this.postUserIfo();
      this.setData({
        isbinded:true
      })
      wx.setStorageSync('telephone', this.data.phone);
   }
    else{
      Dialog.confirm({
        message: '验证码错误',
      }).then(() => {
        this.setData({
          sms:"",
          isSending:false
        })
      })
      .catch(() => {
        this.setData({
          sms:"",
          isSending:false

        })
      });
    }
  },
  onLoad: function (options) {
    if(wx.getStorageSync('userInfo')=="")
    {
      Dialog.confirm({
        title:'未登录',
        message: '请先登录',
      }).then(() => {
      wx.switchTab({
        url: '../../pages/User/User',
      })
      })
      .catch(() => {
        wx.switchTab({
          url: '../../pages/User/User',
        })
      });
    }else{
      if(wx.getStorageSync('telephone')!=""){
        console.log(wx.getStorageSync('telephone'))
        this.setData({
          phone:wx.getStorageSync('telephone'),
          isbinded:true
        })
      }else{
        this.getBindedstate()
      }
    }
  },


})