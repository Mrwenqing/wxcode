import {
  cache
} from "../enum/cache"

// 将商品信息存储到本地
const addCart = (data) => {
  // 获取本地数据
  const carts = wx.getStorageSync(cache.CARTS) || []
  // 判断本地是否有数据
  if (carts.length <= 0) {
    // 没有的话，将添加的商品数量改为1
    data.num = 1
    // 将商品添加到列表
    carts.push(data)
    // 如果本地有数据的话
  } else {
    // 判断本地数据是否存在新添加的商品
    if (_hasData(data)) {
      // 不存在的话
      // 将商品数据的num赋值1
      data.num = 1
      // 将新添加的商品信息添加到商品列表
      carts.push(data)
      // 存在的话
    } else {
      // 将商品的数量加1
      carts.forEach(item => {
        if (item._id == data._id) {
          item.num += 1
        }
      })
    }
  }
  // 将修改完成的商品列表重新存储到本地
  wx.setStorageSync(cache.CARTS, carts)
}

// 判断本地是否有要添加的商品信息
const _hasData = (data) => {
  // 获取到本地存储的商品列表
  const carts = wx.getStorageSync(cache.CARTS)
  // 查找本地数据列表是否有新添加的商品
  const index = carts.findIndex(item => item._id === data._id)
  // 有的话返回false，没有的话返回true
  return index < 0 ? true : false
}

export {
  addCart
}