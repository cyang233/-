//app.js
const http = require('./utils/http')
App({
  onLaunch: function () {
    wx.hideTabBar()
  },
  onShow: function () {
    wx.hideTabBar()
  },
  //设置监听方法 watch
  //参数 obj:对象, val:对象的属性，method:回调函数
  watch: function (obj, val, method) {
    Object.defineProperty(obj, val, {
      configurable: true,
      enumerable: true,
      set: function (nval) {
        nval = val;
        method(nval)
      },
      get: function () {
        return val
      }
    })
  },
  globalData: {
    userinfo:{
     age:19
    }
  }
})