// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    history: [],
    shop: [],
    tabs: [{
        id: 0,
        value: "关注的店铺",
        isActive: true
      },
      {
        id: 1,
        value: "收藏的商品",
        isActive: false
      },
      {
        id: 2,
        value: "我的足迹",
        isActive: false
      }
    ],
    isCome: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    if (!this.data.isCome) {
      const collect = wx.getStorageSync("collect") || [];
      const history = wx.getStorageSync("history") || [];

      // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
      let pages = getCurrentPages();
      // 2 数组中 索引最大的页面就是当前页面
      let currentPage = pages[pages.length - 1];
      // 3 获取url上的type参数
      const {
        type
      } = currentPage.options;
      // 4 激活选中页面标题 当 type=1 index=0 
      this.changeTitleByIndex(type - 1);

      this.setData({
        collect,
        history,
        isCome:true
      });
    }
    const collect1 = wx.getStorageSync("collect") || [];
    if (this.data.collect.length != collect1.length){
      this.setData({
        collect: collect1
      })
    }
  },

  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    // this.getOrders(index + 1);
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