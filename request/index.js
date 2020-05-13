// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params)=>{

  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }

  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success(res){
        resolve(res);
      },
      fail(err){
        reject(err);
      },
      complete(){
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //  关闭加载中的图标
          wx.hideLoading();
        }
      }
    })
  });
};