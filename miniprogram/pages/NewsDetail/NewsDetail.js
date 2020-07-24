import {postRequst} from "../../request/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    elements:{},
    title:""
  },

  async getNewContent(url)
  {
    var that = this
    console.log(url)
    var res = await postRequst({
      url:"http://8.129.210.219/api/news_content",
      data: {
        "news_url": url
      }
    })
    // console.log(res.data)
    that.setData({
      elements:res.data
    })
    console.log(that.data.elements)
  },
  onLoad: function (options) {
    //http://8.129.210.219/api/news_content
    console.log(options)
    this.setData({
      url:options.url,
      title:options.title
    })

  this.getNewContent(options.url)

  },

 
})