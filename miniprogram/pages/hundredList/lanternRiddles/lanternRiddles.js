// pages/hundredList/lanternRiddles/lanternRiddles.js
import api from '../../../api/api';
Page({
  data: {
    result:'',
    flag:false,
  },

showStory(){
  let db = {
    key:api.oneHundred.key,
  }
  api.get(api.oneHundred.zimi, 'get', db).then(res => {
    console.log("res",res)
    if(res.code == 200){
      this.setData({
        result:res.newslist[0],
        flag:false,
      })
    }else if(res.code == 250){
      api.showToast('没有查到，这接口也太不fashion了')
      this.setData({
        result:'',
        flag:false,
      })
    }else{
      api.showToast('可能免费一百次到头了，明天试试')
      this.setData({
        result:'',
        flag:false,
      })
      console.log("res",res)
    }
  }).catch(err => {})

},
showAnswer(){
  this.setData({
    flag:!this.data.flag
  })
},
onLoad: function (options) {
  wx.setNavigationBarTitle({
     title: '猜灯谜',
   })
 },
  onShow() {
    this.showStory()
  },

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