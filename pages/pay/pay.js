import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    fromPage:''
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
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address") || {};
    //如果是商品详情页立即购买跳过来的
    console.log(this.options.frompage)
    if(this.options.frompage == 'detail'){
      let buynoworder = wx.getStorageSync("buynoworder") || [];
      // 1 总价格 总数量
      let totalPrice = 0;
      let totalNum = 0;
      buynoworder.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      })
      this.setData({
        cart: buynoworder,
        totalPrice,
        totalNum,
        address,
        fromPage: 'detail'
      });
      return
    }
    
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });

    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  // 点击 支付 
  async handleOrderPay() {
    if (!this.data.address.userName){
      wx.showToast({
        title: '请先填写您的收货地址后，再结算',
        duration:3000,
        icon:'none'
      })
      return
    }

    //模拟支付成功弹窗
    wx.showToast({
      title: '模拟支付成功',
      icon:'success',
      duration:3000
    })
    //把这个订单信息push到缓存中的成功订单数组中
    let successOrder = wx.getStorageSync("successOrder") || [];
    let orderDetail = {
      detail:this.data.cart
    }
    orderDetail.totalPrice = this.data.totalPrice
    orderDetail.totalNum = this.data.totalNum
    orderDetail.address = this.data.address
    orderDetail.payType = 0 //0 => 已支付，1未支付
    orderDetail.createTime = Date.now()
    orderDetail.orderNum = parseInt(Math.random() * 10000000000000)
    successOrder.push(orderDetail)
    wx.setStorageSync("successOrder", successOrder)
    setTimeout(function(){
      wx.redirectTo({
        url: `/pages/orderDetail/orderDetail?orderNum=${orderDetail.orderNum}`,
      })
    },2000)
    //手动删除缓存中 已经支付了的商品(是从购物车跳过来的才删)
    if(!this.data.fromPage){
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
    }


    // try {
    //   // 1 判断缓存中有没有token 
    //   const token = wx.getStorageSync("token");
    //   // 2 判断
    //   if (!token) {
    //     wx.navigateTo({
    //       url: '/pages/auth/auth'
    //     });
    //     return;
    //   }
    //   // 3 创建订单
    //   // 3.1 准备 请求头参数
    //   // const header = { Authorization: token };
    //   // 3.2 准备 请求体参数
    //   const order_price = this.data.totalPrice;
    //   const consignee_addr = this.data.address.all;
    //   const cart = this.data.cart;
    //   let goods = [];
    //   cart.forEach(v => goods.push({
    //     goods_id: v.goods_id,
    //     goods_number: v.num,
    //     goods_price: v.goods_price
    //   }))
    //   const orderParams = {
    //     order_price,
    //     consignee_addr,
    //     goods
    //   };
    //   // 4 准备发送请求 创建订单 获取订单编号
    //   let res1 = await request({
    //     url: "/my/orders/create",
    //     method: "POST",
    //     data: orderParams
    //   });
    //   const {
    //     order_number
    //   } = res1.data.message
    //   // 5 发起 预支付接口
    //   let res2 = await request({
    //     url: "/my/orders/req_unifiedorder",
    //     method: "POST",
    //     data: {
    //       order_number
    //     }
    //   });
    //   const {
    //     pay
    //   } = res2.data.message
    //   // 6 发起微信支付 
    //   await requestPayment(pay);
    //   // 7 查询后台 订单状态
    //   const res = await request({
    //     url: "/my/orders/chkOrder",
    //     method: "POST",
    //     data: {
    //       order_number
    //     }
    //   });
    //   await showToast({
    //     title: "支付成功"
    //   });
    //   // 8 手动删除缓存中 已经支付了的商品
    //   let newCart = wx.getStorageSync("cart");
    //   newCart = newCart.filter(v => !v.checked);
    //   wx.setStorageSync("cart", newCart);

    //   // 8 支付成功了 跳转到订单页面
    //   wx.navigateTo({
    //     url: '/pages/order/order'
    //   });

    // } catch (error) {
    //   await showToast({
    //     title: "支付失败"
    //   })
    //   console.log(error);
    // }
  },

  // 点击 修改收货地址
  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      this.setData({
        address
      })
      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
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