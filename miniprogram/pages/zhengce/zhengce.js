import {getRequest} from "../../request/request.js"

Page({
  data: {
    value: '',
    radio: '1',
    zhengceList:[],
    currentPage:1,
    searchResult:[],
    showByTag:false,
    showByTitle:false
  },
  changeChoose(event) {
    this.setData({
      radio: event.detail,
    });
    console.log(this.data.radio)
  },
  inputChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  onClick() {
    // console.log('搜索' + this.data.value);
    if(this.data.value=="")
    {
      //检查一下是否可以再显示全部
      //还要把当前页码回复为初始
      console.log("显示全部")
      this.setData({
        showByTag:false,
        showByTitle:false,
        currentPage:1
      })
    }
    else {
        if(this.data.radio=='1')
        {
          console.log("搜索标签")
        this.rearchBytag(this.data.value)
          this.setData({
          showByTag:true,
          showByTitle:false
        })
        }
        else 
        {
          console.log("搜索标题")
          this.rearchBytitle(this.data.value)
          this.setData({
            showByTitle:true,
            showByTag:false
          })
        }
      }
  },
  async rearchBytag(tag)
  {
 // http://47.115.15.249:83/consumer/policy/getPolicyByTag/{tag}
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/policy/getPolicyByTag/"+tag
    })
    console.log(res.data.data )
    this.setData({
      searchResult:res.data.data
    })
},
async rearchBytitle(title)
{
  // http://47.115.15.249:83/consumer/policy/getSimilarTitle/{message}   
   var res = await getRequest({
    url:"http://47.107.110.112/consumer/policy/getSimilarTitle/"+title
   })
  console.log(res)
  this.setData({
    searchResult:res.data.data
  })

},
  async getZhengce(){
    var that = this
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/policy/getPoliciesByPage/"+that.data.currentPage
    })
    console.log(res.data.data)
    // var zhengceList = that.data.zhengceList
    // zhengceList.concat(res.data.data)
    that.setData({
      // zhengceList
      zhengceList: that.data.zhengceList.concat(res.data.data)
    })
    console.log("插入后政策信息")
    console.log(that.data.zhengceList)
  },
  onLoad: function (options) {
    this.getZhengce()
  },
  onReachBottom: function () {
    var currentPage = this.data.currentPage
    currentPage = currentPage+1
    this.setData({
      currentPage
    })
    this.getZhengce()
  }
  
})