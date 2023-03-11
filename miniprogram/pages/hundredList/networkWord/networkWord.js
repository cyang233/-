// pages/hundredList/networkWord/networkWord.js
import api from '../../../api/api';
Page({

  data: {
    word:'',
    result:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
       title: '网络流行语',
     })
   },
  searchWord(){
    console.log("word",this.data.word)
    if(this.data.word === ''){
      api.showToast('请输入网络流行语')
      return
    }
    let db = {
      key:api.oneHundred.key,
      num:1,
      word:this.data.word
    }
    api.get(api.oneHundred.hotword, 'get', db).then(res => {
      console.log("res",res)
      if(res.code == 200){
        this.setData({
          result:res.newslist[0].content
        })
      }else if(res.code == 250){
        this.setData({
          result:'没有查到，这接口也太不fashion了'
        })
      }else{
        api.showToast('可能免费一百次到头了，明天试试')
        this.setData({
          result:''
        })
        console.log("res",res)
      }
    }).catch(err => {})

  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      word:event.detail
    })
  },
  onShow() {

  },

  onUnload() {

  },

  onShareAppMessage() {

  }
})