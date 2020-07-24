import {getRequest} from "../../request/request.js"
var util = require('../../utils/util.js');
const plugin = requirePlugin("WechatSI")
//获取语音识别权限
const Recordmanager = plugin.getRecordRecognitionManager()


Page({

  data: {
    title:"点击输入标题",
    isRecording:false,
    content:"会议内容",
  },
 
  onLoad: function (options) {

      //设置插件函数  
      var that = this
      Recordmanager.onRecognize = function(res) {
        // showtxt(res.result)
        console.log('实时处理')
        console.log("current result", res.result)
        that.setData(
          {
            content:res.result
          }
        )
      }

      Recordmanager.onError = function(res){
        console.error("error msg", res.msg)
      }
      Recordmanager.onStart = function(res) {
        console.log("成功开始录音识别", res)
      }
      Recordmanager.onStop = function(res) {
        that.setData(
          {
            content:res.result
          }
        )
        wx.showToast({
          title: res.result,
          icon: 'success',
          duration: 2000
        })
        // 注意
        console.log("record file path", res.tempFilePath)
        console.log("result", res.result)
        console.log('识别结束')
        
      }

  },
  handleTitleInput(e){
    console.log(e)
    this.setData({
      title:e.detail.value
    })
  },
  handleContentInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  record(){
    if(!this.data.isRecording){
    Recordmanager.start({ lang: "zh_CN"})
    console.log('开始录音')
    }
    else if(this.data.isRecording){
      Recordmanager.stop()
    }
    this.setData({
      isRecording:!this.data.isRecording
    })
  },
  //保存会议记录
  async handleSave(){
         // 调用函数时，传入new Date()参数，返回值是日期和时间
         var time = util.formatTime(new Date());
        console.log(time)
        var regularTime = time.replace(/\//g,"-");
        console.log(regularTime)
        var that = this

    var res = await getRequest({
      url:"http://47.107.110.112/consumer/meeting/addMeeting?openId="+wx.getStorageSync('openid')+"&title="+that.data.title+"&contexts="+that.data.content+"&times="+regularTime
    })
    console.log(res)
  },
  checkRecord(){

      //查看会议记录
      wx.navigateTo({
        url: '../../pages/MeetingRecord/MeetingRecord',
      })
    
  }
})