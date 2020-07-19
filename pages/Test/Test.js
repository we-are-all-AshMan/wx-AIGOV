
Page({ 
  /**   * 页面的初始数据   */
  data: {
    // 存储拍照的图片地址    
    src: '',
    // 获取设备的高度, 用wh来定义设备高度    
    wh: 0 ,
    attendSuccessImg1: "",
    attendSuccessImg2: "",
    canvasImgUrl:'',
    src:""
  },
  /**   * 生命周期函数--监听页面加载   */ 
  onLoad: function(options) {
    var sysinfo = wx.getSystemInfoSync()    
  

// 获取设备的高度    
    var windowHeight = sysinfo.screenHeight; // 屏幕高度    
    this.setData({      
    wh: windowHeight    
    })  

  },
  chooseImage(){
    wx.chooseImage({
      sourceType: ['camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0]);
        wx.uploadFile({
          url: 'http://175.24.57.96:5555/uploadImage', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(data);
            //do something
          },fail:function(err){
            console.log(err)
          }
        })
      }
    })
  },
  // 拍照功能  
// takePhotoMySelf: function() {    
//   var ctx = wx.createCameraContext(); 
//   // 获取拍照权限    
//   var _this = this;    
//   ctx.takePhoto({      
//   quality: 'high',     
//   success: function(res) { 
//   // 返回拍照执行成功函数        
  
//   console.log(res.tempImagePath); // 拍照图片地址        
//   _this.setData({          
//   // src: res.tempImagePath        })      }    });  },​  
//   /**   * 生命周期函数--监听页面加载   */  
//   onLoad: function (options) {    
//   // 获取设备的信息, 使用微信的开发文档    
//   var sysinfo = wx.getSystemInfoSync();​    
//   // 获取设备的高度    
//   var windowHeight = sysinfo.screenHeight; 
//   // 屏幕高度    
//   this.setData({      wh: windowHeight    });​
//   }

})
