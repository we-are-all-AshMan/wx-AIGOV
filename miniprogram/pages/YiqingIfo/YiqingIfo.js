import {getRequest} from "../../request/request.js";
// var wxCharts = require('../../utils/wxcharts.js');
// var datlineChart = null;
// var yuelineChart = null;
Page({
  data: {
    ec: {
      onInit: function (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        return chart;
      },

      lazyLoad: true // 延迟加载

    },
       //左边的菜单栏数据
       leftMenuList:["全部新闻","最新新闻","国内疫情数据","国际疫情数据","疫情数据"],
       //被点击的左侧菜单
      currentIndex:0,
      //右侧显示的新闻内容
      //所有新闻
      rightNewsList1:[
      ],
      //最新所有新闻
      rightNewsList2:[
      ],
      //国内疫情数据
      nationIfo:[],
      //国际疫情数据
      foreignIfo:[],
      // 右侧显示图表
      rightCanvas:{},
      //用来画折线图的数据
      NationCurrentConfirmedCounts:[
        {"2020-7-15":"2000"},
        {"2020-7-15":"3000"},
        {"2020-7-15":"4000"},
        {"2020-7-15":"5000"},
        {"2020-7-15":"4000"},
        {"2020-7-15":"3000"},
        {"2020-7-15":"2000"}
      ],
      GlobalCurrentConfirmedCounts:[
        {"2020-7-15":"2000"},
        {"2020-7-15":"1000"},
        {"2020-7-15":"500"},
        {"2020-7-15":"1000"},
        {"2020-7-15":"2000"},
        {"2020-7-15":"3000"},
        {"2020-7-15":"4000"}
      ],
  },
  gotoPage: function(e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({
        url: '../charts/' + page + '/' + page
    });
},
  handleItemTap(e){
    console.log(e.currentTarget.dataset);
    let cindex = e.currentTarget.dataset.index;
    this.setData(  {currentIndex :cindex} )
  },
  async getNews(){
    const res = await getRequest(
      {url:"http://47.107.110.112/consumer/news/getAllNews"}
      );
      const rightNewsList1 = res.data.data;
      this.setData({rightNewsList1});
  },
  async getNewsByDate(date)
  {
    const res = await getRequest(
      {url:"http://47.107.110.112/consumer/news/getNewsByDate/"+date}
      );
      const rightNewsList2 = res.data.data;
      this.setData({rightNewsList2});
      // console.log(this.data.rightNewsList2);
  },
  async getNationdata(date)
  {
    const res = await getRequest(
      {url:"http://47.107.110.112/consumer/news/getAllDescNation/"+date}
      );
    const nationIfo = res.data.data;
    this.setData({nationIfo});
    // console.log(this.data.nationIfo);
    },
 
  async getForeigndata(date)
  {
    const res = await getRequest(
      {url:"http://47.107.110.112/consumer/news/getAllDescForeign/"+date}
      );
      const foreignIfo = res.data.data;
      this.setData({foreignIfo});
      // console.log(this.data.foreignIfo);
  },

  onLoad: function(options){
    // this.createCanvs(this.data.canvasData,this.data.screenSize);
      //折线图
      // this.initChart();
    //调用获取所有新闻
    this.getNews();
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);   
    //获取当日日期  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    //获取今日的新闻
    this.getNewsByDate(Y+"-"+M+"-"+D);
    //获取国内疫情数据
    this.getNationdata(Y+"-"+M+"-"+D);
    //获取国际疫情数据
    this.getForeigndata(Y+"-"+M+"-"+D);

  },
 

  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});