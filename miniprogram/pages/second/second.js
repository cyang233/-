const http = require('../../utils/http');
const app = getApp()
Page({
  data: {
  list:[],
  path:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '项目经历',
    })
    this.getData();
  },
  //获取数据
  getData:function(){
    let that = this;
    let db = wx.cloud.database();
    db.collection('project').get({
      success:function(res){
        console.log("数据",res.data)
        that.setData({
          list:res.data
        })
      }
    })
  },
  toDetail(){
    this.setData({
      path:'https://dev.renguangming.com'
    })
  }
})