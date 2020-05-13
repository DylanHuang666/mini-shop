import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [
      {
        "order_id": 1,
        order_number: "HMDD20190802000000000428",
        order_price: 13999,
        create_time: 1564731518
      },
      {
        "order_id": 2,
        order_number: "HMDD20190802000000000428",
        order_price: 3999,
        create_time: 1564731518
      },
      {
        "order_id": 3,
        order_number: "HMDD20190802000000000428",
        order_price: 13999,
        create_time: 1564731518
      },
      {
        "order_id": 4,
        order_number: "HMDD20190802000000000428",
        order_price: 1999,
        create_time: 1564731518
      },
      {
        "order_id": 5,
        order_number: "HMDD20190802000000000428",
        order_price: 999,
        create_time: 1564731518
      },
      {
        "order_id": 6,
        order_number: "HMDD20190802000000000428",
        order_price: 888,
        create_time: 1564731518
      }
    ],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.redirectTo({
    //     url: '/pages/auth/auth'
    //   });
    //   return;
    // }

    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const { type } = currentPage.options;
    // 4 激活选中页面标题 当 type=1 index=0 
    this.changeTitleByIndex(type - 1);
    // this.getOrders(type);
    this.setData({
      orders: this.data.orders.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
    })
  },

  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    this.setData({
      orders: res.data.message.orders.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
    })
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    // this.getOrders(index + 1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})