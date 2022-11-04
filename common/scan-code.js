import indexAPI from '../api/index'

// 开启扫码
const getScanCode = async () => {
  const res = await wx.scanCode({
    // 只扫条形码
    onlyFromCamera: true,
  })
  return res.result
}

// 凭借ID获取商品信息
const getProductionInfo = async (code) => {
  try {
    let data = {
      qcode: code
    }
    const response = await indexAPI.getProductInfo(data)

    if (response.length > 0) {
      return response[0]
    } else {
      wx.showToast({
        title: '获取不到商品信息',
        icon: 'none'
      })
    }
  } catch (error) {
    console.log(error)
  }
}


export {
  getScanCode,
  getProductionInfo
}