Page({
  data: {
    currentClickedstep:-1,
    isclickstep:false,
    steps: [
      {
        text: '上传资料',
        desc: '填写收货地址，上传身份证、行驶证、车头找等信息',
      },
      {
        text: '步骤二',
        desc: '工作人员审核相关资料并将车辆信息写入ETC设备',
      },
      {
        text: '安装激活',
        desc: '收到设备后自助安装，通过手机蓝牙连接设备激活',
      }  
    ]
  },
  start()
  { 
    wx.navigateTo({
      url: '../../pages/ETC1/ETC1'
    })
  },
  query(){
    wx.navigateTo({
      url: '../../pages/ETCquery/ETCquery'
    })
  },
  handleClickstep(e){
    console.log(e.detail);
    this.setData({ 
      isclickstep: true ,
      currentClickedstep:e.detail
    });
  },
  //关闭弹窗
  onClose() {
    this.setData({ isclickstep: false });
  },
})