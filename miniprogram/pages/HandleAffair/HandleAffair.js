import {postRequst} from "../../request/request.js"
import{getRequest}  from "../../request/request.js"
import Dialog from '../../van-dist/dialog/dialog';
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否点击了步骤条，决定弹窗是否出现
    isclickstep:false,
    //最近点击的步骤条是哪个，决定弹窗的内容
    currentClickedstep:-1,
     // 获取设备的高度, 用wh来定义设备高度    
     wh: 0 ,
    // 存储拍照的图片地址    
    src: '',
    //选取的身份证照片
    attendSuccessImg1: "",
    //上传的图片大小，用来计算品质
    attendSuccessImg1Size:0,
    cWidth:"",
    cHeight:"",
    //压缩后的地址
    imagePath:"",
    //下面两个链接要通过我们的图床获取
    //证件照链接
    idcard_face_url:"",
    //待检测照片链接
    compared_face_url:"",

    uploaded:false,
    //姓名
    name: '',
    //住址
    address:"",
    // 身份证号
    Id:"",
    //电话
    tele:"",
    //状态
    state:-1,
    //输入的验证码
    sms:"",
    //正确的验证码
    rightsms:"",
    //是否在发送验证码
    isSending:"",
    active:-1,
    steps: [
      {
        text: '步骤一',
        desc: '上传相关信息',
      },
      {
        text: '步骤二',
        desc: '人脸识别',
      },
      {
        text: '步骤三',
        desc: '等待审核',
      },
      {
        text: '步骤四',
        desc: '审核通过',
      },
    ],
  },
    //处理点击步骤条出现弹窗的事件
    handleClickstrp(e){
      console.log(e.detail);
      this.setData({ isclickstep: true ,
        currentClickedstep:e.detail
      });
    },
    //关闭弹窗
    onClose() {
      this.setData({ isclickstep: false });
    },
  //重拍
  reChoose:function(){
    this.setData({      
      src: ''    }) 
  },
  //人脸识别拍照的函数
  takePhotoMySelf:function(){
    var ctx = wx.createCameraContext(); 
    // 获取拍照权限    
    var _this = this;    
    ctx.takePhoto({      
    quality: 'high',     
    success: function(res) { 
    // 返回拍照执行成功函数        
    // console.log(res.tempImagePath); // 拍照图片地址        
    _this.setData({          
    src: res.tempImagePath        
  })     
  //把照片上传图床 
  wx.uploadFile({
    url: 'http://47.107.110.112/uploadImage', 
    filePath: _this.data.src,
    name: 'file',
    formData: {
      'user': 'test'
    },
    success: function (res) {
      var data = res.data
      // console.log(data);
      _this.setData({
        compared_face_url:data
      })
      console.log(_this.data.compared_face_url);
      //do something
    },fail:function(err){
      console.log(err)
    }
  })
}   
 }); 
  },
  //选择身份证照片的函数
   chooseImage(){
    var that=this;
    wx.chooseImage({
      sourceType: ['camera','album'],
      sizeType:['compressed'],
      success: function (res) {
        console.log("这里chooseIMage")
        console.log(res)
        var tempFilePaths = res.tempFilePaths

          wx.getFileInfo({
            filePath:tempFilePaths[0],
            success (res) {
              console.log("这里获取原图大小")
              console.log(res.size)
              that.setData({
                attendSuccessImg1Size:res.size
              })
            }
          })

          var quality = (1048576/that.data.attendSuccessImg1Size)*0.9

        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function (res) {
            console.log("这里获取图片宽高")
            that.setData({
              cWidth: res.width,
              cHeight: res.height
            })

                    //对图片进行压缩
            that.getCanvasImg(tempFilePaths, that.data.cWidth, that.data.cHeight, quality, function (res) {
              console.log("这里进行压缩")
              console.log(res)
              that.setData({
                imagePath: res.tempFilePath
              });
              console.log(that.data.imagePath)


              //压缩后上传
              wx.uploadFile({
                url: 'http://47.107.110.112/uploadImage', 
                filePath: that.data.imagePath,
                name: 'file',
                formData: {
                  'user': 'test'
                },
                success: function (res) {
                  var data = res.data
                  // console.log(data);
                  that.setData({
                    idcard_face_url:data
                  })
                  console.log(that.data.idcard_face_url);
                  that.uploadOCR(that.data.idcard_face_url);
                  //do something
                },fail:function(err){
                  console.log(err)
                }
              })





            })

          }
        })

        wx.getFileInfo({
          filePath:that.data.imagePath,
          success (res) {
            console.log("压缩后大小：")
            console.log(res.size)
          }
        })

        that.setData({
          uploaded:true,
          attendSuccessImg1:tempFilePaths[0]
        });

 
      }
    })
  },
  //图片压缩
  getCanvasImg(tempFilePaths, canvasWidth, canvasHeight, quality, callback) {
    var that = this; 
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(tempFilePaths[0], 0, 0, canvasWidth, canvasHeight);
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        fileType: 'jpg',
        quality: quality,
        success: function success(res) {
          callback && callback(res)
        }, fail: function (e) {
          wx.showToast({
            title: '图片上传失败，请重新上传！',
            icon: 'none'
          })
        }
      });
    });
  },
  //上传使用OCR
  async uploadOCR(idcard_face_url)
  {
    var result = await postRequst({
      url:"http://120.25.24.74/api/ocr",
      data:{
        "ocr_image_url": idcard_face_url
      }
    })
    // console.log("这里")
    console.log(result.data.data.text);
    var dizhi="";
    var carId=""

    for(var i =0;i<result.data.data.text.length;i++)
    {
      if(result.data.data.text[i].length==18)
      {
        carId=result.data.data.text[i]
      }
    }
    // console.log(dizhi);
    this.setData({
      name:result.data.data.text[0],
      address:result.data.data.text[5]+result.data.data.text[6],
      Id:carId
    })
  },
  //点击发送验证码
  async handleClickSendsms(){
    var that = this;
   //提示发送到哪个手机号上了
   $Toast({
    content: '已发送验证码到绑定的手机号',
    type: 'success'
    });
      var res = await getRequest({
        url:"http://47.107.110.112/consumer/identity/sendMessage/"+wx.getStorageSync('telephone')
      })
      console.log(res);
      this.setData({
        isSending:true,
        rightsms:res.data.data
      })
    },
    onChangeName(e)
    {
      this.setData({
        name:e.detail
      })
    },
    onChangeAddress(e)
    {
      this.setData({
        address:e.detail
      })
    },
    onChangeId(e){
      this.setData({
        Id:e.detail
      })
    },
    onChangeSms(e){
      this.setData({
        sms:e.detail
      })
    },
  //从active1到active2
  active1Tap(e){
    if(this.data.sms!=this.data.rightsms){
      console.log(this.data.sms)
      console.log(this.data.rightsms)
      $Toast({
        content: '验证码错误',
        type: 'warning',
        duration: 1,
        });
        setTimeout(() => {
          this.setData({
            sms:""
            })
      }, 1000);
    }
    else if(this.data.name!=""&&this.data.address!=""&&this.data.Id!="")
    {
    this.setData(
      {
        active:1
      },)
    }
    else{
      $Toast({
        content: '请填写完整信息',
        type: 'warning'
    });
    //  setTimeout(() => {
    //       this.setData({
    //           active:2
    //         })
    //   }, 3000);
    }
  },
  //从active2到active3
  // 在这里进行人脸识别
  async active2Tap(e)
  {
    var that = this;
    console.log(that.data.idcard_face_url);
    console.log(that.data.compared_face_url);
    var res =  await postRequst(
      {
        url:"http://120.25.24.74/api/fr/compare",
        data:{
          "idcard_face_url": that.data.idcard_face_url,
          "compared_face_url": that.data.compared_face_url
        }
 
      })
      console.log(res);
      if(res.data.status==1){
        // http://47.115.15.249:89/consumer/identity/create
        getRequest({
          url:"http://47.107.110.112/consumer/identity/create",
          data:{
            "imageUrl":that.data.imagePath,
            "name":that.data.name,
            "idNum":that.data.Id,
            "place":that.data.address,
            "gender":"",
            "openId":wx.getStorageSync('openid'),
            "state":3
          }
        })
        $Toast({
          content: '认证成功',
          icon: 'prompt',
          duration: 3,
          mask: false
      });
        setTimeout(() => {
          this.setData({
              active:2
            })
      }, 3000);
      }
      else if(res.data.status!=1)
      {
        $Toast({
          content: res.data.info,
          icon: 'warning',
          duration: 3,
          mask: false
      });
        setTimeout(() => {
     
          this.setData({
            src:""
          })
      }, 3000);
      }
  },
  //初始页面点击开始办理
  start()
  {
    this.getState()
  
  },
  async getState()
  {
    var that =this
    var res = await getRequest({
    url:"http://47.107.110.112/consumer/identity/getIdentityByOpenId/"+wx.getStorageSync('openid')
    })
    console.log(res)
    this.setData({
      state:res.data.data.state
    })
    if(res.data.data.state==0){
      that.setData({
        active:0
      })}
      else{
        wx.showToast({
          title:'您已经办理',
          icon: 'warning',
          duration: 2000,
          mask: true
      });
    }


  },
  query()
  {
    wx.navigateTo({
      url: '../../pages/ShenfenQuery/ShenfenQuery',
    })
  },

  onLoad:function(options){
    //在刚载入时判断电话是否绑定了，如果没有绑定则跳到绑定电话页面
    //如果绑定了则将数据写到data
    const phone = wx.getStorageSync('telephone')
    if(phone==""){
      console.log("空");
      Dialog.confirm({
        title: '未绑定电话',
        message: '请先进行电话绑定',
      })
        .then(() => {
          wx.redirectTo ({
            url: "../../pages/Telephone/Telephone"
          });
        })
        .catch(() => {
          wx.redirectTo ({
            url: "../../pages/Telephone/Telephone"
          });
        });
      }
    else{
     this.setData({
      tele: phone
     })
    }
    // 获取设备的高度    
    var sysinfo = wx.getSystemInfoSync()    
    var windowHeight = sysinfo.screenHeight; // 屏幕高度    
    this.setData({      
    wh: windowHeight*0.7    
    })  
  }
})