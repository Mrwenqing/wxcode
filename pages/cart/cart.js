import {
  cache
} from "../../enum/cache"
import {
  getScanCode,
  getProductionInfo
} from "../../common/scan-code"
import {
  addCart
} from "../../common/cart"
// pages/cart/cart.js
Page({
  // 点击继续添加按钮事件
  async AddScanCode(e) {
    // 开启扫码并获取商品id
    const result = await getScanCode()
    console.log(result);
    // 通过id获取商品信息
    const response = await getProductionInfo(result)
    console.log(response);
    // 将商品存储到本地
    addCart(response)

    this.getCartList()
    this.getProductTotalPrice()
  },
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0
  },

  getCartList() {
    // 获取本地商品列表
    const carts = wx.getStorageSync(cache.CARTS)
    console.log("goods", carts)
    // 将本地商品列表赋值给cartList
    this.setData({
      cartList: carts
    })
  },

  // 减号按钮点击事件
  handleDecrement(e) {
    // 获取到操作的下标
    const index = e.currentTarget.dataset.index
    // 获取到操作商品的数量
    const num = this.data.cartList[index].num
    // 调用 removeCartItem 函数并获取其返回值
    const itemStatus = this.removeCartItem(num, index)
    // 如果为true的话，停止后面代码运行
    if (itemStatus) return
    // 将当前商品数量减一
    this.data.cartList[index].num -= 1
    this.setData({
      cartList: this.data.cartList
    })
    // 将数据存储到本地
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    this.getProductTotalPrice()
  },

  removeCartItem(num, index) {
    // 如果操作商品的数量为1的话
    if (num === 1) {
      // 提示弹窗
      wx.showModal({
        content: '您确定要删除此商品吗?',
        success: (res) => {
          if (res.confirm) {
            // 删除操作商品
            this.data.cartList.splice(index, 1)
            this.setData({
              cartList: this.data.cartList
            })
            // 存储本地
            wx.setStorageSync(cache.CARTS, this.data.cartList)
            this.getProductTotalPrice()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return true
    }
  },

  // 计算总价
  getProductTotalPrice() {
    // 如果商品列表有数据的话
    if (this.data.cartList && this.data.cartList.length > 0) {
      // let 一个变量来接受总价
      let totalPrice = 0
      // 计算总价并赋值
      this.data.cartList.forEach(item => {
        totalPrice += item.num * item.price
      })
      this.setData({
        totalPrice
      })
    }
  },

  // 加号按钮点击事件
  handleIncrement(e) {
    // 获取到当前操作商品的下标
    const index = e.currentTarget.dataset.index
    // 商品数量加1
    this.data.cartList[index].num += 1
    this.setData({
      cartList: this.data.cartList
    })
    // 存储操作完成的数据
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    // 调用计算总价方法
    this.getProductTotalPrice()
  },

  // 去结算按钮点击事件
  handleToOrder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.getProductTotalPrice()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})