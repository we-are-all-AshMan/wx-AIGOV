var that =this;
var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
        currentTapIndex:0,
        nationIfo:"点击图表查看详细信息",
        nationsIfo:[
            "美国约翰斯·霍普金斯大学发布的疫情数据显示，截至北京时间6月19日6时30分左右，美国累计确诊2182285例，累计死亡118296例。与前一日6时30分数据相比，美国新增确诊病例22839例，新增死亡病例633例。 \n 当前，美国多个州新冠肺炎确诊病例数继续攀升。据美国有线电视新闻网统计，21个州在过去数周出现新冠病毒感染确诊案例增加，8个州保持稳定。目前美国各地均开始了不同程度重启，专家预计新冠病毒感染第二次高峰正在到来。",
            "根据意大利民事保护部门6月18日18时公布的数据，过去24小时该国新增333例新冠肺炎确诊病例，累计确诊238159例（阿布鲁佐大区核减2例确诊病例）；死亡病例新增66例，连续18日在100例以下，累计死亡34514例。\n 受新冠疫情影响，意大利2020年的高考取消所有笔试，考生只需轮流进入考场进行时长为1小时的口试。当地时间6月17日，意大利50万高中毕业生如期走进考场。教育部门明文规定，在考场外等待考试的学生必须佩戴口罩，互相保持2米的安全距离。进行口试时可摘下口罩，但学生仍需与考官保持至少2米的距离。"
       
        ]
    },
    back1: function () {
        wx.navigateBack({
          delta: 1
        })
      },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
        const index = pieChart.getCurrentDataIndex(e);
        this.setData({
            nationIfo:this.data.nationsIfo[index]
        });
       
    },        
    onLoad: function (e) {
        var windowWidth = 250;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
            console.log(windowWidth);
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '美国',
                data: 2191052,
            }, {
                name: '巴西',
                data: 978142,
            }, {
                name: '俄罗斯',
                data: 569063,
            }, {
                name: '印度',
                data: 380532,
            }, {
                name: '英国',
                data: 300469,
            }, {
                name: '西班牙',
                data: 245268,
            }, {
                name: '秘鲁',
                data: 244388,
            }, {
                name: '意大利',
                data: 238159,
            }, {
                name: '智利',
                data: 225103,
            }, {
                name: '伊朗',
                data: 197647,
            }],
            width: windowWidth*0.8,
            height: 300,
            dataLabel: true,
        });
    }
});