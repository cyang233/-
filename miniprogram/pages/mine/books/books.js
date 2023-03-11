const app = getApp();
const http = require('../../../utils/http')
Page({
  data: {
    list: [],
    name: '',
    word: '',
    appid: '',
    num: 1, //第一次执行getAppid
    maxliu: false, //最大留言数
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '心灵树洞',
    })
    this.getData();
  },
  //获取appid
  getAppid: function () {

    let that = this;
    http.http('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2087d8819a75761e&secret=182192b65c696d1a1c3d18abb77268f4', 'get')
      .then(res => {
        that.setData({
          appid: res.data.access_token
        })
        if (res.data.errcode == "45009") {
          that.setData({
            maxliu: true,
          })
        }
        console.log("执行", res.data.errcode, res.data.errcode == 45009, that.data.maxliu)
      })
    if (this.data.num == 1) {
      let a = setInterval(function () {
        that.getAppid()
      }, 7200000)
    }
  },
  //获取数据
  getData: function () {
    let that = this;
    const db = wx.cloud.database({
      env: 'firstcloud-ykf1'
    })
    db.collection('treeHole').get({
      success: function (res) {
        that.setData({
          list: res.data
        })
        console.log("sj", res, that.data.list)
      }
    })
  },
  //昵称
  getName: function (el) {
    this.setData({
      name: el.detail.value
    })
  },
  //留言
  getWord: function (el) {
    this.setData({
      word: el.detail.value
    })
  },
  //提交
  AddList: function () {
    let that = this;
    if (this.data.num == 1) {
      this.getAppid();
    } else {
      this.setData({
        num: 2
      })
    }
    setTimeout(function () {
      if (that.data.maxliu == true) {
        wx.showToast({
          title: '不想看了，明天再留吧',
          icon:'none'
        })
      } else {
        if (this.data.name == '') {
          wx.showToast({
            title: '请输入昵称',
            icon: 'none'
          })
        } else if (this.data.msg == '') {
          wx.showToast({
            title: '请输入留言内容',
          })
        } else {
          wx.request({
            url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${that.data.appid}`,
            data: {
              content: that.data.word,
            },
            method: 'POST',
            //请求头
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              console.log("mlg", res.data)
              if (res.data.errcode == 0) {
                const db = wx.cloud.database();
                db.collection('treeHole').where({
                  nickname: that.data.name
                }).get({
                  success: function (res) {
                    if (res.data.length > 0) {
                      wx.showToast({
                        title: '昵称已被占用',
                      })
                    } else {
                      db.collection('treeHole').add({
                        data: {
                          nickname: that.data.name,
                          msg: that.data.word,
                          year: new Date().getFullYear(),
                          month: new Date().getMonth() + 1,
                          day: new Date().getDate()
                        },
                        success: function (res) {
                          that.getData()
                          wx.showToast({
                            title: '留言成功',
                            icon: 'none'
                          })
                        }
                      })
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: '内容含违法内容，请重新输入',
                  icon: 'none'
                })
              }
            },
          })
        }
      }
    }, 500)
  }
})