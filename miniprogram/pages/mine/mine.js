// miniprogram/pages/mine/mine.js
const http = require('../../utils/http')
Page({
  data: {
    user: '点击头像 找我聊天',
    imgsrc: 'https://img.yzcdn.cn/vant/cat.jpeg', //默认头像
    login: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置标题
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },
  //登录
  login: function () {
    if (this.data.login == false) {
      let that = this;
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            user: res.userInfo.nickName,
            imgsrc: res.userInfo.avatarUrl
          })
        }
      })
    } else {}
    this.setData({
      login: true
    })
  },
  //查询qq信息
  qqinfo: function () {
    wx.navigateTo({
      url: '../qqinfo/qqinfo',
    })
  },
  //天气预报
  weather: function () {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  //换个头像
  history: function () {
    wx.navigateTo({
      url: '../headig/headig',
    })
  },
  //换个壁纸
  talking: function () {
    wx.navigateTo({
      url: '../wallpaper/wallpaper',
    })
  },
})