//因为后端服务器地址的变化 所以所有url都需要写全称

//同时发送异步代码的次数
let ajaxTimes = 0;

//使用promise封装一个 请求
export function yiqingRequest(params){
    ajaxTimes ++  //发送一次请求就加一次

    // 在请求 数据回来之前 显示一个加载中
    wx.showLoading({
        title: '加载中',
        mask:true
      })

    //定义公共部分 url 则在传递参数时就不必要将公共部分也传进来了 在下面拼接就好了
    // const baseUrl = "http://175.24.57.96:88/consumer"
    //将传过来的参数结构出来
    return new Promise((resolve,reject)=>{
        // 发起请求          
        wx.request({
            //...params是解构params参数
            //就是传入的数据 一个对象{}
            ...params,
            url:params.url,
            data:params.data,
            success:(res)=>{
                //成功的回调
                var categories = [];
                var data = [];
                for(var i = 0,l=res.data.data.length;i<l;i++){
                    for(var key in res.data.data[i]){
                        categories.push(key);
                        data.push(res.data.data[i][key]);
                   }
                }
                resolve({
                    categories: categories,
                    data: data
                })
            },
            fail:(err)=>{
                //失败的回调
                reject(err)
            },
            complete:()=>{
                ajaxTimes -- //请求完成一次 ，就减一次
                if(ajaxTimes===0){
                    //当所有的请求都完成时，就关闭 加载中 弹框
                    wx.hideLoading()
                }
            }
        });
    });
}