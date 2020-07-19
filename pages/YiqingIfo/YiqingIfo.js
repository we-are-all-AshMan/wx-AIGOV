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
    //   //折线图数据
    //   canvasData:{
    //     id:"canvas-id",
    //   data:[
    //     {"2020-7-15":"2000"},
    //     {"2020-7-15":"3000"},
    //     {"2020-7-15":"4000"},
    //     {"2020-7-15":"5000"},
    //     {"2020-7-15":"4000"},
    //     {"2020-7-15":"3000"},
    //     {"2020-7-15":"2000"}
    //   ]
    // },
    // screenSize:{
    //   width:750,
    //   height:600
    // }
      // //折线图数据
      // list: [70, 150, 170, 200, 100, 267, 20],
      // h32: 32,
      // h64: 64,
      // h360: 360,
      // h420: 420,
      // s28: 28,
      // s18: 18,
      // //Y轴分成的大分段
      // heightLineNum: 7,
      // //X轴分成的大分段
      // widthLineNum: 10,
      // //Y轴一个分段的值
      // yOneDuan: 50
    
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
      {url:"http://175.24.57.96:88/consumer/news/getAllNews"}
      );
      const rightNewsList1 = res.data.data;
      this.setData({rightNewsList1});
  },
  async getNewsByDate(date)
  {
    const res = await getRequest(
      {url:"http://175.24.57.96:88/consumer/news/getNewsByDate/"+date}
      );
      const rightNewsList2 = res.data.data;
      this.setData({rightNewsList2});
      // console.log(this.data.rightNewsList2);
  },
  async getNationdata(date)
  {
    const res = await getRequest(
      {url:"http://175.24.57.96:88/consumer/news/getAllDescNation/"+date}
      );
    const nationIfo = res.data.data;
    this.setData({nationIfo});
    // console.log(this.data.nationIfo);
    },
 
  async getForeigndata(date)
  {
    const res = await getRequest(
      {url:"http://175.24.57.96:88/consumer/news/getAllDescForeign/"+date}
      );
      const foreignIfo = res.data.data;
      this.setData({foreignIfo});
      // console.log(this.data.foreignIfo);
  },

  /**
 * 画图表
 */
// createCanvs(canvsData,screenSize){
//   const rectWidth = screenSize.width * 0.94 * 0.62;
//   const rectHeight = screenSize.height * 0.2;
//   const ctx = wx.createCanvasContext(canvsData.id);   //创建画布上下文对象
//   const grd = ctx.createLinearGradient(0, 0, 200, 0) //创建线性渐变对象
//   const yoffset = 5;                     //y轴偏移量
//   const xoffset = 20;                     //x轴偏移量 
//   var Datainfo = [];
//   var xMax = 100;
//   var xMin = 0;
//   var yMax = 100;
//   var yMin = 0;
//   //获取数据的最大最小值
//   var xinfo = this.getMaxMininfo(canvsData.data,"time",0);
//   var yinfo =  this.getMaxMininfo(canvsData.data, "value", 0);

//   xMax = parseInt(xinfo.max);
//   xMin = parseInt(xinfo.min);
//   yMax = parseInt(yinfo.max);
//   yMin = parseInt(yinfo.min);

//   grd.addColorStop(0, '#F780A1');
//   grd.addColorStop(0.8, '#F1CA5B');
//   grd.addColorStop(1, '#6CB78B');

//   ctx.setStrokeStyle("#E5E5E5");                    //设置颜色值
//   ctx.strokeRect(xoffset, yoffset, rectWidth, rectHeight);
//   //画横线
//   for(var i = 0;i < 6;i++){
//     ctx.beginPath();
//     ctx.moveTo(xoffset, rectHeight / 7 * (i + 1) + yoffset);
//     ctx.lineTo(rectWidth + xoffset, rectHeight / 7 * (i + 1) + yoffset);
//     ctx.stroke();
//   }
//   //画竖线
//   for (var i = 0; i < 19; i++) {
//     ctx.beginPath();
//     ctx.moveTo(rectWidth / 20 * (i + 1) + xoffset, yoffset);
//     ctx.lineTo(rectWidth / 20 * (i + 1) + xoffset, rectHeight + yoffset);
//     ctx.stroke();
//   }
//   //画数据
//   ctx.setStrokeStyle(grd);      //切换为红色划线
//   ctx.setLineWidth(3);

//   //画横坐标显示文字
//   ctx.setFontSize(10);                //设置字号
//   for(var i = 0; i < 4;i++){
//     ctx.fillText((yMin + i * 2 * (yMax - yMin) / 7).toFixed(0), 5, rectHeight + yoffset -  i * 2 * rectHeight / 7);
//   }

//   //计算横纵坐标单位长度
//   var xUnit = rectWidth / (xMax - xMin);
//   var yUnit = rectHeight/ (yMax - yMin);

//   if (typeof canvsData.data[0] != undefined){
//     //开始画路径

//     //按照time元素从小到大排序
//     canvsData.data.sort(function(a,b){
//       return a.time-b.time;
//     });
//     ctx.beginPath(); 
//     //遍历数据源
//     for (var x in canvsData.data) {

//       let xgo = xUnit * (canvsData.data[x].time - xMin) + xoffset;
//       let ygo = rectHeight - yUnit * (canvsData.data[x].value - yMin) + yoffset;
//       if(x == 0){
//         ctx.moveTo(xgo, ygo);
//       }else{
//         ctx.lineTo(xgo, ygo);
//       }  
//       Datainfo[x]={
//         "xgo": xgo,
//         "ygo": ygo
//       }; 
//     }
//     ctx.stroke();
//     for (var l in Datainfo){ 
//       //画外圆 
//       ctx.beginPath();
//       ctx.arc(Datainfo[l].xgo, Datainfo[l].ygo, 4, 0, 2 * Math.PI);
//       ctx.setFillStyle("#FF4D59");
//       ctx.stroke();
//       //画内圆
//       ctx.beginPath();
//       ctx.setFillStyle("#fff");
//       ctx.arc(Datainfo[l].xgo, Datainfo[l].ygo, 2, 0, 2 * Math.PI);
//       ctx.fill(); 
//     } 
//   } 
//   ctx.draw();
// },

/**
 * 获取最大值最小值
 */
// getMaxMininfo(arry,element,offset){
//   var info = {
//     max:0,
//     min:0
//   };
//   for(var x in arry){
//     if(x == 0){
//       info.max = arry[x][element];
//       info.min = arry[x][element];
//     }
//     if(info.max < arry[x][element]){
//       info.max = arry[x][element];
//     }
//     if(info.min > arry[x][element]){
//       info.min = arry[x][element];
//     } 
//   }  
//   info.max = parseInt(info.max) + offset;
//   info.min = parseInt(info.min) - offset;
//     if (info.min < 0){
//       info.min = 0;
//     } 
//   return info;
// },

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
 // 初始化折线图
//  initChart: function () {
//   const ctx = wx.createCanvasContext('canvasId')

//   ctx.beginPath()
//   ctx.setStrokeStyle('#000000')
//   ctx.setFillStyle('#000000')
//   ctx.setLineWidth(1)

//   //坐标原点，Y轴坐标值从上往下是增加
//   const leftBottomX = this.getEleWidth(this.data.h64)
//   const leftBottomY = this.getEleWidth(this.data.h360)
//   //Y坐标
//   const leftTopX = this.getEleWidth(this.data.h64)
//   const leftTopY = this.getEleWidth(this.data.h32)
//   //X坐标
//   const rightBottomX = this.getEleWidth(this.data.h420)
//   const rightBottomY = this.getEleWidth(this.data.h360)

//   const yHeight = this.getEleWidth(this.data.h360 - this.data.h32)
//   const xWidth = this.getEleWidth(this.data.h420 - this.data.h64)

//   //从Y轴坐标开始画坐标系
//   //Y轴坐标到原点坐标画出Y轴线
//   //画完Y轴线，再从原点坐标到X轴坐标画出X轴线
//   ctx.moveTo(leftTopX, leftTopY)
//   ctx.lineTo(leftBottomX, leftBottomY)
//   ctx.lineTo(rightBottomX, rightBottomY)
//   //设置字体大小
//   ctx.setFontSize(this.getEleWidth(this.data.s28))
//   //设置字的位置
//   ctx.fillText("", this.getEleWidth(63), this.getEleWidth(32))

//   //划分Y轴
//   this.drawYScale(ctx);
//   //划分X轴
//   this.drawXScale(ctx);

//   //画折线
//   this.drawCharts(ctx);
//   ctx.stroke()
//   ctx.draw(true)
// },

// //划分Y轴
// drawYScale: function (ctx) {
//   var that = this;

//   //Y轴坐标刻度横坐标起点
//   var scaleStartX = this.getEleWidth(this.data.h64)
//   //长的刻度
//   var scaleEndX = this.getEleWidth(this.data.h64 + 18)
//   //短的刻度
//   var littleScaleEndX = this.getEleWidth(this.data.h64 + 9)

//   //Y轴刻度总高度
//   const yHeight = this.getEleWidth(this.data.h360)
//   //一个大分段的长度，一共分为6段
//   var oneScaleX = yHeight / this.data.heightLineNum
//   //大分段数字字体大小
//   ctx.setFontSize(this.getEleWidth(this.data.s18))
//   //大分段数字位置横坐标
//   var textX = this.getEleWidth(this.data.h64 - 42)
//   //大分段，长刻度：50-300
//   for (var i = 1; i < this.data.heightLineNum; i++) {
//     var scaleEndY = yHeight - oneScaleX * i
//     //画长刻度线条
//     ctx.moveTo(scaleStartX, scaleEndY)
//     ctx.lineTo(scaleEndX, scaleEndY)
//     ctx.fillText(this.data.yOneDuan * i, textX, scaleEndY + this.getEleWidth(10))
//     var littleScaleStartY = yHeight - oneScaleX * (i - 1)
//     //小分段，短刻度
//     for (var j = 1; j < 5; j++) {
//       var littleScaleEndY = littleScaleStartY - (oneScaleX / 5) * j
//       //画短刻度线条
//       ctx.moveTo(scaleStartX, littleScaleEndY)
//       ctx.lineTo(littleScaleEndX, littleScaleEndY)
//       ctx.stroke();
//     }
//   }
//   //高和低虚线Y轴坐标
//   const lowlimitLineY = yHeight - oneScaleX * 2
//   const middlelimitLineY = yHeight - oneScaleX * 4
//   const highlimitLineY = yHeight - oneScaleX * 6

//   //虚线总长度
//   const rightBottomX = this.getEleWidth(this.data.h420)
//   const space = this.getEleWidth(10)
//   //限制虚线
//   that.drawDashLine(ctx, scaleStartX, lowlimitLineY, rightBottomX, lowlimitLineY, space)
//   that.drawDashLine(ctx, scaleStartX, middlelimitLineY, rightBottomX, middlelimitLineY, space)
//   that.drawDashLine(ctx, scaleStartX, highlimitLineY, rightBottomX, highlimitLineY, space)
// },

// //划分X轴
// drawXScale: function (ctx) {
//   var that = this;
//   //虚线总高度
//   var scaleStartY = this.getEleWidth(that.data.h360)
//   //虚线顶点Y轴高度
//   var scaleEndY = this.getEleWidth(that.data.h32)
//   //X轴总长度=X轴横坐标-向右偏移长度
//   const xWidth = this.getEleWidth(that.data.h420 - that.data.h64)
//   //X轴起始点
//   const xMaginLeft = this.getEleWidth(that.data.h64)
//   //一个分段的宽度
//   const oneScaleX = xWidth / (that.data.widthLineNum + 1)
//   const space = this.getEleWidth(10)
//   for (var i = 0; i < that.data.widthLineNum + 1; i++) {
//     var toEndX = xMaginLeft + oneScaleX * i;
//     if (i > 0) {
//       that.drawDashLine(ctx, toEndX, scaleStartY, toEndX, scaleEndY, space)
//     }
//     ctx.fillText(i, toEndX - this.getEleWidth(5), scaleStartY + this.getEleWidth(30))
//   }
// },

// //画虚线
// drawDashLine: function (ctx, x1, y1, x2, y2, dashLength) {
//   //传context对象，始点x和y坐标，终点x和y坐标，虚线长度
//   ctx.beginPath()
//   ctx.setLineWidth(0.5)
//   var dashLen = dashLength === undefined ? 3 : dashLength,
//     //得到横向的宽度;
//     xpos = x2 - x1,
//     //得到纵向的高度;
//     ypos = y2 - y1,
//     numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
//   //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
//   for (var i = 0; i < numDashes; i++) {
//     if (i % 2 === 0) {
//       ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
//       //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
//     } else {
//       ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
//     }
//   }
//   ctx.stroke();
// },

// //画折线
// drawCharts: function (ctx) {
//   ctx.beginPath()
//   ctx.setStrokeStyle("#FF0000")
//   var that = this;
//   var list = that.data.list;

//   const yHeight = this.getEleWidth(that.data.h360)
//   const xWidth = this.getEleWidth(that.data.h420 - this.data.h64)
//   //X坐标，一个空格的值
//   const oneScaleX = xWidth / (that.data.widthLineNum + 1)
//   //Y坐标，一个空格的值
//   var oneScaleY = yHeight / this.data.heightLineNum;

//   for (var i = 0; i < list.length; i++) {
//     var height = list[i];
//     //计算X坐标
//     var x = oneScaleX * (i + 1) + this.getEleWidth(that.data.h64);
//     //计算Y坐标
//     var y = yHeight - oneScaleY / this.data.yOneDuan * height
//     if (i == 0) {
//       ctx.moveTo(x, y)
//     } else {
//       ctx.lineTo(x, y)
//     }
//   }

//   ctx.stroke()
//   ctx.draw(true)
// },

// //获取屏幕自适应宽度
// getEleWidth: function (w) {
//   var real = 0;
//   try {
//     var res = wx.getSystemInfoSync().windowWidth;
//     //以宽度480px设计做宽度的自适应
//     var scale = (480 / 2) / (w / 2);
//     real = Math.floor(res / scale);
//     return real;
//   } catch (e) {
//     return false;
//   }
// },

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