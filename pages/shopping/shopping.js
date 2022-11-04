import {
  getScanCode,
  getProductionInfo
} from '../../common/scan-code'

import {
  addCart
} from '../../common/cart'
// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertList: []
  },

  // 获取轮播图图片
  getSlideshow() {
    const data = [{
      id: 1,
      link: "",
      src: "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/20229rbBQ9QMiE1646710319.jpg?x-oss-process=image/resize,w_1920,h_575"
    }, {
      id: 2,
      link: "",
      src: "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575"
    }, {
      id: 3,
      link: "",
      src: "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575"
    }]
    this.setData({
      advertList: data
    })
  },

  // 点击扫码事件
  async handleCode() {
    // 扫码并返回商品ID
    const result = await getScanCode()
    // console.log(result);
    // 获取商品信息
    const response = await getProductionInfo(result)
    console.log(response);
    addCart(response)
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSlideshow()
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