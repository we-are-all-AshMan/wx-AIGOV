// pages/Question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入框中的输入内容
    inputValue: '',
    istyping:false,
    //提示语
    tips:'您好，欢迎使用智能客服，请问您有什么需要帮助的？\n\n       热门问题：',
    //热门问题
    hottopics:['食品经营许可，申请餐饮服务，住所和经营场所可以不一样吗\n',
              '食品经营许可，申请餐饮服务，住所和经营场所可以不一样吗\n',
              '食品经营许可，申请餐饮服务，住所和经营场所可以不一样吗\n',
             ],
    content:['这场抗击新冠肺炎疫情的严峻斗争，让你们这届高校毕业生经受了磨练、收获了成长，也使你们切身体会到了‘志不求易者成，事不避难者进’的道理。前进的道路从不会一帆风顺，实现中华民族伟大复兴的中国梦需要一代一代青年矢志奋斗。”'
            ,'7月7日，习近平总书记给中国石油大学（北京）克拉玛依校区毕业生回信，肯定他们到边疆基层工作的选择，对广大高校毕业生提出殷切期望。']
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log(this.data.inputValue);
  },
  handleTapHottopic(e)
  {
    console.log(e.target.dataset);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})