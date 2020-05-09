import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      console.log(res)
      this.setData({
        swiperList: res.data.message
      })
    });
  },
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(res => {
      // console.log(res)
      this.setData({
        catesList: res.data.message
      })
    });
  },
  // 获取 楼层数据
  getFloorList() {
    request({
        url: "/home/floordata"
      })
      .then(res => {
        this.setData({
          floorList: res.data.message
        })
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