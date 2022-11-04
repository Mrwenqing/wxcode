import request from "./http"

function wxToPromise(method, options) {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = (error) => {
      reject(err)
    }
    wx[method](options)
  })
}

export {
  wxToPromise
}