import {getRequest} from "../../request/request.js"
Page({


  data: { 
    newsid:null,
    com_comments:[],
    hot_comments:[]
  },

//http://8.129.210.219/api/news_comment?newsid=
  
async getComment()
{
  var res = await getRequest({
    url:"http://8.129.210.219/api/news_comment?newsid="+this.data.newsid
  })
  console.log(res.data.comments)
  this.setData({
    com_comments:res.data.comments.com_comments,
    hot_comments:res.data.comments.hot_comments
  })
},
  onLoad: function (options) {
    console.log(options.newsid)
    this.setData({
      newsid:options.newsid
    })
    this.getComment()
    }, 
})