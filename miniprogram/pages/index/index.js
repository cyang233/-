//index.js
const app = getApp()
const http = require("../../utils/http")
import api from '../../api/api'
Page({
  data:{
    itemList:[
      {title:'智能聊天室',value:0},
      {title:'每日一百次',value:1},
      {title:'更多功能',value:2},
    ]
  },
  onLoad:function(el){
    wx.hideTabBar()
    // wx.setNavigationBarTitle({
    //   title: 'Its Me',
    // })
  },
  onShow(){
    wx.hideTabBar()
  },
  toDetail(e){
    console.log("e",e.currentTarget.dataset)
    let value = e.currentTarget.dataset.value;
    if(value == 0){
      wx.navigateTo({
        url: '/pages/chatPage/chatPage',
      })
    }else if(value ==1){
      wx.navigateTo({
        url: '/pages/hundredList/hundredList',
      })
    }else{
      api.showToast('敬请期待')
    }
  }
})