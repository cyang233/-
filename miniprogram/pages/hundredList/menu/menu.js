// pages/hundredList/menu/menu.js
import api from '../../../api/api';

Page({
  data: {
    word:'',
    result:{
      cp_name:'',
      texing:'',
      tiaoliao:'',
      tishi:'',
      yuanliao:'',
      zuofa:''
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
       title: '菜谱查询',
     })
   },
  searchWord(){
    console.log("word",this.data.word)
    if(this.data.word === ''){
      api.showToast('请输入菜谱名或原料名')
      return
    }
    let db = {
      key:api.oneHundred.key,
      word:this.data.word
    }
    api.get(api.oneHundred.caipu, 'get', db).then(res => {
      console.log("res",res)
      if(res.code == 200){
        this.setData({
          result:res.newslist[0]
        })
      }else if(res.code == 250){
        api.showToast('没有查到，这接口也太不fashion了')
        this.setData({
          result:{ cp_name:'',
          texing:'',
          tiaoliao:'',
          tishi:'',
          yuanliao:'',
          zuofa:''}
        })
      }else{
        api.showToast('可能免费一百次到头了，明天试试')
        this.setData({
          result:{ cp_name:'',
          texing:'',
          tiaoliao:'',
          tishi:'',
          yuanliao:'',
          zuofa:''}
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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