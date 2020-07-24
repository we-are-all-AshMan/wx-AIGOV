Page({

  data: {
    steps: [
      {
        text: '步骤一',
        desc: '上传信息资料',
      },
      {
        text: '步骤二',
        desc: '等待审核',
      },
      {
        text: '步骤三',
        desc: '审核通过，即可使用',
      }
    ],
  },
  start(){
    wx.navigateTo({
      url: '../../pages/Shebao2/Shebao2'     
    })
  }
,query(){
  wx.navigateTo({
    url: '../../pages/Shebaoquery/Shebaoquery'     
  })
}
  
})