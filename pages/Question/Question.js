import {getRequest} from "../../request/request.js";
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
    hottopics:['食品经营许可，申请餐饮服务，住所和经营场所可以不一样吗？\n',
              '考证的时候使用的是一代身份证号码，想申请变更为现在的二代身份证号码可以吗？\n',
              '办理护士执业注册时的健康体检证明需要哪些医疗机构出具？\n',
             ],
    content:[],
    //根据已输入内容做出的提示内容
    predictContent:[]
          },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    
    console.log(this.data.inputValue);
    this.getPredict(this.data.inputValue);
  },
  handleTapinput(e){
    console.log("惦记我");
    console.log(this.data.istyping);
    this.setData(
      {
        istyping:true
      }
    )
  },
  handleTapPredict(e)
  {
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    // console.log(this.data.predictContent[index]);
    let text = this.data.predictContent[index];
    this.setData({
      inputValue:text,
      istyping:false
    });
    console.log(this.data.inputValue);
  },
  handleTapHottopic(e)
  {
    console.log(e.target.dataset);
  },
  //点击发送按钮
  submitQuestion()
  {
    this.getAnswer(this.data.inputValue);
    this.setData({
      inputValue:"",
      predictContent:null
    })
  },
  //获取答案
  async getAnswer(question){
    const res = await getRequest(
      {
        url:"http://47.107.110.112:8004/chattingRobot/"+question
      }
      );
      console.log(res.data.message);
      var abc = this.data.content;
      abc.push(res.data.message);
      this.setData({
        content:abc
      })
        },
  async getPredict(inputContent)
  {
    const res = await getRequest(
      {
        url:"http://47.107.110.112:8004/chattingRobot/predict/"+inputContent
      }
      );
    this.setData({predictContent:res.data.questionList});
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