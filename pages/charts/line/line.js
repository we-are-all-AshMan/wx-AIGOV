import {getRequest} from "../../../request/request.js"
import {yiqingRequest} from "../../../request/yiqingRequest.js"
var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;


Page({
    data: {
        categories:[],
        data:[]
    },
    //获取最新的国内疫情数据
    async getNationCurrentConfirmedCounts()
    {
        var categories = [];
        var data = [];
        var res = await getRequest({
            url:"http://175.24.57.96:88/consumer/news/getNationCurrentConfirmedCounts"
        })
        for(var i = 0,l=res.data.data.length;i<l;i++){
            for(var key in res.data.data[i]){
                categories.push(key);
                data.push(parseInt(res.data.data[i][key]));
           }
        }      
        this.setData({
            categories,
            data
        })
        console.log("这里");
        console.log(this.data.categories);
        console.log(this.data.data);
    },
    //获取最新的全球疫情数据
    async getGlobalCurrentConfirmedCounts()
    {
        var categories = [];
        var data = [];
        var res = await getRequest({
            url:"http://175.24.57.96:88/consumer/news/getGlobalCurrentConfirmedCounts"
        })
        for(var i = 0,l=res.data.data.length;i<l;i++){
            for(var key in res.data.data[i]){
                categories.push(key);
                data.push(parseInt(res.data.data[i][key]));
           }
        }      
        this.setData({
            categories,
            data
        })
        console.log("这里");
        console.log(this.data.categories);
        console.log(this.data.data);
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },   
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('2016-' + (i + 1)+'-2');
            data.push(Math.random()*(200)+10);
        }
        data[4] = null;
        // console.log(categories);
        // console.log(data);
        return {
            categories: categories,
            data: data
        }
    }, 
   //点击更新的
   //改成切换
    updateData: function () {
        var that = this;
        this.getGlobalCurrentConfirmedCounts().then(function(){


            var series = [{
                name: '全球数据',
                data: that.data.data
            }];
            lineChart.updateData({
                categories: that.data.categories,
                series: series,
                yAxis: {
                    title: '确诊人数',
                    min: that.data.data[0]*0.7
                },
            });

        })
  
    },

    onLoad: function (e) {
        var that =this;
        var windowWidth = 375;
  
        
        this.getNationCurrentConfirmedCounts().then(function(){  
            console.log(that.data.categories);
            console.log(that.data.data);
        
            lineChart = new wxCharts({
                canvasId: 'lineCanvas',
                type: 'line',
                categories: that.data.categories,
                // categories:categories,
                animation: true,
                // background: '#f5f5f5',
                series: [{
                    name: '全国确诊',
                    data: that.data.data
                    // data:data
                }],
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    title: '确诊人数',
                    min: that.data.data[0]*0.7
                },
                width: 375,
                height: 200,
                dataLabel: false,
                dataPointShape: true,
                extra: {
                    lineStyle: 'curve'
                }
            });
        
        });
     
       
      
    }
});