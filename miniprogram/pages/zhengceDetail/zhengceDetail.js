import {getRequest} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context:{},
    contexts:""
  },

  onLoad: function (options) {
    // console.log(options)
    var that = this
    //http://47.115.15.249:83/consumer/policy/getPolicyByTitle/{title}
    this.getContent(options.title).then(function(){
      var contexts = that.data.context.contexts;
      console.log("这里")
      console.log(contexts)
      contexts = contexts.replace(/↵/g, '\n');
      that.setData({
        contexts
      })
    })

  },

 async getContent(title)
 {
   var res = await getRequest({
     url:"http://47.107.110.112/consumer/policy/getPolicyByTitle/"+title
   })
   this.setData({
     context:res.data.data
   })
   console.log(this.data.context)
 }
})