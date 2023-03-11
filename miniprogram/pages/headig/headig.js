// miniprogram/pages/history/history.js
const http = require("../../utils/http")
Page({
  /**
   * 页面的初始数据
   */
  data: {
      img:'',   //头像地址
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '换个头像',
    })
  },
  //获取头像
  getImg:function(el){
    let that = this;
    let tp = el.currentTarget.dataset.tp;
    http.http('https://api.66mz8.com/api/rand.portrait.php','get',{
      type:tp,
      format:'json'
    }).then(res=>{
      that.setData({
        img:res.data.pic_url
      })
    })
  }
})