import {getRequest} from "../../request/request.js"
import Dialog from '../../van-dist/dialog/dialog';

const { $Toast } = require('../../dist/base/index');
Page({
  data:{
    //输入的车牌数字部分
    carId:"",
    //车主姓名
    carName:"",
    //收货人
    recevieName:"",
    //电话号码
    telephone:"",
    //详细地址
    address:"",
    region: ['湖北省', '武汉市', '武昌区'],
    customItem: '全部',
    //车牌可选择信息
    array1: ['京', '津', '沪', '渝',"冀","豫","云","辽","黑","湘","皖","鲁","新","苏","浙","赣","鄂","桂","甘","晋","蒙","陕","吉","闽","贵","粤","青","藏","川","宁","琼"],
    index1: 0,
    array2: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    index2: 0,
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  updateCarIdValue(e){
    console.log(e.detail.value);
    this.setData({
      carId:e.detail.value
    })
  },
  updateCarNameValue(e){
    this.setData({
      carName:e.detail.value
    })
  },
  updateRecevieNameValue(e){
    this.setData({
      recevieName:e.detail.value
    })
  },
  updateTeleValue(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  updatAddressValue(e){
    this.setData({
      address:e.detail.value
    })
  },
 async handlePostETC(){
    //当所有信息都填了的时候
    if(this.data.carId!=""&&this.data.carName!=""&&this.recevieName!=""&&this.data.telephone!=""&&this.data.address!="")
    {
      var res = await getRequest({
        url:"http://47.107.110.112/consumer/etc/create?car="+this.data.carId+"&host="+this.data.carName+"&consignee="+this.data.recevieName+"&tel="+this.data.telephone+"&province="+this.data.region[0]+"&city="+this.data.region[1]+"&address="+this.data.address+"&openId="+wx.getStorageSync('openid')

      })
      console.log(res);
      $Toast({
        content: '成功申办，请转到查询页面查询最新进展',
        icon: 'prompt',
        duration: 3,
        mask: false
    });
    setTimeout(() => {
        $Toast.hide();
        wx.navigateTo({
          url: '../../pages/ETCquery/ETCquery',
        })
    }, 3000);
    }
    else{
      $Toast({
        content: '请填写相关信息',
        type: 'warning'
    });
 
    }
  },
  onLoad:function(options){
            //在刚载入时判断电话是否绑定了，如果没有绑定则跳到绑定电话页面
    //如果绑定了则将数据写到data
    const phone = wx.getStorageSync('telephone')
    if(phone==""){
      console.log("空");
      Dialog.confirm({
        title: '未绑定电话',
        message: '请先进行电话绑定',
      })
        .then(() => {
          wx.redirectTo ({
            url: "../../pages/Telephone/Telephone"
          });
        })
        .catch(() => {
          wx.redirectTo ({
            url: "../../pages/Telephone/Telephone"
          });
        });
      }
    else{
     this.setData({
      telephone: phone
     })
    }
  }
})