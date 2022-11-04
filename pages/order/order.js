import {
  cache
} from '../../enum/cache'

import getGoodsTotalPrice from '../../common/gain-goods-total-price'

// pages/order/order.js
Page({
  // 获取本地商品数据
  getCartList() {
    const orderList = wx.getStorageSync(cache.CARTS) || []
    console.log(orderList);
    this.setData({
      orderList
    })
  },

  // 点击确认支付跳转至支付成功页面
  handlePayment() {
    wx.navigateTo({
      url: '/pages/success/success',
    })
  },

  // 点击展开收起按钮事件
  handleOrderSwitch() {
    let length = this.data.orderList.length
    length = this.data.orderSize === 1 ? length : 1
    this.setData({
      orderSize: length
    })
  },

  // 点击余额按钮事件
  handleChange(e) {
    const value = e.detail.value
    this.setData({
      switchStatus: value
    })
    this.computeTotalPrice()
  },

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderSize: 1,
    balance: 4,
    deducted: 0,
    switchStatus: true,
    totalPrice: 0,
    realPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList(),
      this.computeTotalPrice()
  },

  // 计算价格
  computeTotalPrice() {
    const totalPrice = getGoodsTotalPrice(this.data.orderList)
    if (this.data.switchStatus) {
      if (this.data.balance > totalPrice) {
        this.data.balance -= totalPrice
        this.setData({
          balance: this.data.balance,
          totalPrice,
          deducted: totalPrice,
          realPrice: 0
        })
      } else {
        this.data.realPrice = totalPrice - this.data.balance
        this.setData({
          totalPrice,
          realPrice: this.data.realPrice,
          deducted: this.data.balance,
          balance: 0
        })
      }
    } else {
      this.data.realPrice = totalPrice
      this.setData({
        balance: 4,
        totalPrice,
        realPrice: this.data.realPrice
      })
    }
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