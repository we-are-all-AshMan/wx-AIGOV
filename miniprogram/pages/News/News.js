import {postRequst} from "../../request/request.js"
import {getRequest} from "../../request/request.js"

Page({


  data: {
    //搜索框中的内容
    gifUrl:"https://s1.ax1x.com/2020/07/24/UXRwEq.gif",
    value: '',
    tagList:[
      {"tag":"时政 高层","Id":"210802,1001,14576,34948","isadded":false},
      {"tag":"财经 产经","Id":"210803,1004,413883","isadded":false},
      {"tag":"股票 能源","Id":"67815,71661","isadded":false},
      {"tag":"社会 法治","Id":"210804,1008,42510","isadded":false},
      {"tag":"国际 军事","Id":"210805,1011,1002","isadded":false},
      {"tag":"教科 文卫","Id":"210806,1006,1007,1013,14739","isadded":false},
      {"tag":"台湾 港澳","Id":"210807,14657,42272","isadded":false},
      {"tag":"观点 理论","Id":"210808,40531,1003","isadded":false},
      {"tag":"传媒 舆情","Id":"210809,14677,209043","isadded":false},
      {"tag":"体育 娱乐","Id":"22176,210810,14820,1012","isadded":false},
      {"tag":"电视 图片","Id":"210811,174585,1016","isadded":false},
      {"tag":"游戏 动漫","Id":"210812,40130,122366","isadded":false},
      {"tag":"家电 通信","Id":"41390,183008","isadded":false},
      {"tag":"食品 房产","Id":"215731,194441","isadded":false},
      {"tag":"人工智能","Id":"422228","isadded":false},
      {"tag":"人民创投","Id":"405954","isadded":false}
    ],
    chosentags:[],
    titleList:[]
  },
  //图片加载成功之后执行
  gifImgLoad(e) {
    var gifurl = this.data.gifUrl;
    var nowTime = +new Date();
    setTimeout(() => {
      this.setData({
        gifUrl: gifurl + '?' + nowTime
    })
  }, 1000)
},
  async handleclick(e){
    console.log(e)
    const index = e.target.dataset.index

        if(!this.data.tagList[index].isadded){
        this.data.chosentags.push(e.target.id)
        }
        else{
          for(var i in this.data.chosentags){
            if(i.indexOf(e.target.id)==-1)
            this.data.chosentags.pop(e.target.id);
            }
        }
    this.data.tagList[index].isadded=!this.data.tagList[index].isadded
    this.setData({
      tagList:this.data.tagList
    })
        console.log(this.data.chosentags)
     var res = await   postRequst({
      url:"http://8.129.210.219/api/hot_news",
      data: {"tag_values":this.data.chosentags}
    })
    console.log(res.data.items)
    for(var j in res.data.items)
    {
      // console.log(res.data.items[j].title)
      res.data.items[j].title = res.data.items[j].title.replace('&nbsp','\n')
    }
    this.setData({
      titleList:res.data.items
    })
  },
  inputChange(e) {
    this.setData({
      value: e.detail,
    });
  }, 
  async onClick() {
    var that = this
   var res = await getRequest({
     url:"http://8.129.210.219/api/search?query="+that.data.value
   })
   console.log(res.data.items)
   this.setData({
    titleList:res.data.items,
    value:""
  })
  },
  onLoad: function (options) {

  },

  
})