// pages/hundredList/nameHistory/nameHistory.js
import api from '../../../api/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'',
    result:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
       title: '姓氏起源',
     })
   },
  searchWord(){
    console.log("word",this.data.word)
    if(this.data.word === ''){
      api.showToast('请输入姓氏')
      return
    }
    let db = {
      key:api.oneHundred.key,
      xing:this.data.word
    }
    api.get(api.oneHundred.surname, 'get', db).then(res => {
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})