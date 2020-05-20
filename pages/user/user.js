var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
    historyNums: 0,
    userLocation:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: '7CJBZ-5XRYX-JOB46-ZEDWL-SRM5E-KFBFT' // 必填
    });
    
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      // isHighAccuracy: true,
      // highAccuracyExpireTime: 4000,
      success: (res)=> {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res) => {
            console.log(res)
            this.setData({
              userLocation: res.result.ad_info.city + res.result.ad_info.district
            })
          }
        })
      }
    })
  },

  gotomap() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      isHighAccuracy: true,
      highAccuracyExpireTime: 4000,
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  gotovideo(){
    wx.navigateTo({
      url: '/pages/video/video',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const userinfo = wx.getStorageSync("userinfo") || {};
    const collect = wx.getStorageSync("collect") || [];
    const history = wx.getStorageSync("history") || [];
    this.setData({
      userinfo,
      collectNums: collect.length,
      historyNums: history.length
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})