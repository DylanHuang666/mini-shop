import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
    index:0
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  //综合数据
  initGoodsList:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(888)
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    // 获取 总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // 拼接了数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    if (this.QueryParams.pagenum == 1){
      this.initGoodsList = res.data.message.goods
    }

    //点的是销量，按销量排一次
    if (this.data.index == 1) {
      this.data.goodsList.sort(function (a, b) {
        return b.goods_id - a.goods_id
      })
      this.setData({
        goodsList: this.data.goodsList
      })
    }
    //点的是价格，再价格小到大排一次
    if (this.data.index == 2) {
      this.data.goodsList.sort(function (a, b) {
        return a.goods_price - b.goods_price
      })
      this.setData({
        goodsList: this.data.goodsList
      })
    } 

    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();

  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    console.log(index)
    this.data.index = index
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })

    //点击不同tab更换数据
    if (index == 0) {
      this.setData({
        goodsList: this.initGoodsList
      })
      this.QueryParams.pagenum = 1
    }
    if (index == 1) {
      this.data.goodsList.sort(function (a, b) {
        return b.goods_id - a.goods_id
      })
      this.setData({
        goodsList: this.data.goodsList
      })
    }
    if(index == 2){
      this.data.goodsList.sort(function (a, b) {
        return a.goods_price - b.goods_price
      })
      this.setData({
        goodsList: this.data.goodsList
      })
    } 
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
    // 1 重置数组
    this.setData({
      goodsList: []
    })
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    // 3 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //  1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({
        title: '没有下一页数据啦',
        icon: 'none',
        duration: 2000
      });

    } else {
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList(); 
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})