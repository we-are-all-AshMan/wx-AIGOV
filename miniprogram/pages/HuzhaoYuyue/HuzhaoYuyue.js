import {getRequest} from "../../request/request.js"
var util = require('../../utils/util.js');
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();

// const date = new Date();
// const years = [];
// const months = [];
// const days = [];
// const hours = [];
// const minutes = [];
// //获取年
// for (let i = 2018; i <= date.getFullYear() + 5; i++) {
//   years.push("" + i);
// }
// //获取月份
// for (let i = 1; i <= 12; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   months.push("" + i);
// }
// //获取日期
// for (let i = 1; i <= 31; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   days.push("" + i);
// }
// //获取小时
// for (let i = 0; i < 24; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   hours.push("" + i);
// }
// //获取分钟
// for (let i = 0; i < 60; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   minutes.push("" + i);
// }
Page({

  data: {
    activeNames: [],
    startDate: "请选择日期",

    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
    // time: '',
    // // multiArray: [years, months, days, hours, minutes],
    // multiArray: [days, hours],
    // // multiIndex: [0, 9, 16, 10, 17],
    // multiIndex: [16, 10],
    // choose_year: '',

  },

  onChange(event) {
    console.log(event)
    this.setData({
      activeNames: event.detail,
    });
  },
  appointment(){
    // wx.showActionSheet({
    //   itemList: ['今日上午', '今日下午', '明日上午','明日下午'],
    //   success: function(res) {
    //    console.log(res.tapIndex)


    //    wx.showLoading({
    //     title: '预约成功',
    //     type:'success'
    //    })
    //    setTimeout(function () {
    //     wx.hideLoading()
    //    }, 500)
    //   },
    //   fail: function(res) {
    //    console.log(res.errMsg)
    //   }
    //  })
    // var time = util.formatTime(new Date());
    // console.log(time)
    // var regularTime = time.replace(/\//g,"-");
    // console.log(regularTime)

     // getRequest({
     //openId=&affair=&times=
     //   url:"http://47.107.110.112/consumer/appointment/addAppointment"
     // })
  },
  onLoad: function (options) {
    //设置默认的年份
    // this.setData({
    //   choose_year: this.data.multiArray[0][0]
    // })
  },

  pickerTap:function() {
    date = new Date();

    var monthDay = ['今天','明天'];
    var hours = [];
    var minute = [];
    
    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if(data.multiIndex[0] === 0) {
      if(data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },




  bindMultiPickerColumnChange:function(e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);
        
      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if(data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);

  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute){
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth()+1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
    //点击确认
    console.log(that.data.startDate)
    that.sendAppoint()

  },
  async sendAppoint()
  {
    var that = this
    var res = await getRequest({
      url:"http://47.107.110.112/consumer/appointment/addAppointment?openId="+wx.getStorageSync('openid')+"&affair=护照预约&times="+that.data.startDate
    })
    console.log(res)
  }
    // //获取时间日期
    // bindMultiPickerChange: function(e) {
    //   // console.log('picker发送选择改变，携带值为', e.detail.value)
    //   this.setData({
    //     multiIndex: e.detail.value
    //   })
    //   const index = this.data.multiIndex;
    //   const year = this.data.multiArray[0][index[0]];
    //   const month = this.data.multiArray[1][index[1]];
    //   const day = this.data.multiArray[2][index[2]];
    //   const hour = this.data.multiArray[3][index[3]];
    //   const minute = this.data.multiArray[4][index[4]];
    //   // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    //   this.setData({
    //     time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    //   })
    //   // console.log(this.data.time);
    // },
    // //监听picker的滚动事件
    // bindMultiPickerColumnChange: function(e) {
    //   //获取年份
    //   if (e.detail.column == 0) {
    //     let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
    //     console.log(choose_year);
    //     this.setData({
    //       choose_year
    //     })
    //   }
    //   //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    //   if (e.detail.column == 1) {
    //     let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
    //     let temp = [];
    //     if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
    //       for (let i = 1; i <= 31; i++) {
    //         if (i < 10) {
    //           i = "0" + i;
    //         }
    //         temp.push("" + i);
    //       }
    //       this.setData({
    //         ['multiArray[2]']: temp
    //       });
    //     } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
    //       for (let i = 1; i <= 30; i++) {
    //         if (i < 10) {
    //           i = "0" + i;
    //         }
    //         temp.push("" + i);
    //       }
    //       this.setData({
    //         ['multiArray[2]']: temp
    //       });
    //     } else if (num == 2) { //判断2月份天数
    //       let year = parseInt(this.data.choose_year);
    //       console.log(year);
    //       if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
    //         for (let i = 1; i <= 29; i++) {
    //           if (i < 10) {
    //             i = "0" + i;
    //           }
    //           temp.push("" + i);
    //         }
    //         this.setData({
    //           ['multiArray[2]']: temp
    //         });
    //       } else {
    //         for (let i = 1; i <= 28; i++) {
    //           if (i < 10) {
    //             i = "0" + i;
    //           }
    //           temp.push("" + i);
    //         }
    //         this.setData({
    //           ['multiArray[2]']: temp
    //         });
    //       }
    //     }
    //     console.log(this.data.multiArray[2]);
    //   }
    //   var data = {
    //     multiArray: this.data.multiArray,
    //     multiIndex: this.data.multiIndex
    //   };
    //   data.multiIndex[e.detail.column] = e.detail.value;
    //   this.setData(data);
    // }
})