import {getRequest} from "../../request/request.js"
Page({


  data: {
    hotNewsList:[]
  },

  //http://8.129.210.219/api/hot_topic
  async getHotNewsList()
  {
    var res = await getRequest({
      url:"http://8.129.210.219/api/hot_topic"
    })
    console.log(res.data.hot_topic)
    this.setData({
      hotNewsList:res.data.hot_topic
    })
  },
  gotoHotComment(e)
  {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/HotComment/HotComment?newsid='+e.currentTarget.dataset.id,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function (options) {
    this.getHotNewsList()
  },

  
})