// pages/chatPage/chatPage.js
import api from '../../api/api';
Page({
  data: {
    list: [],
    msg:'', //发送的信息
    scrollTop: 0, //向上滚动距离
    canClick: true, //防止连续点击
    show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
      title: '聊天解闷',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  showInfo(){
    this.setData({ show: true });
  },
  onClose(){
    this.setData({ show: false });
  },
  onChange(event){
    this.setData({
      msg: event.detail
    })
  },
  // 发送信息
  sendMsg(){
    let db = {
      key:'free',
      appid:0,
      msg:this.data.msg
    }
    if (this.data.canClick) {
      this.data.list.push({
        reply:'',
        question:this.data.msg
      })
      this.setData({
        list:this.data.list,
        msg:null,
        scrollTop: this.data.scrollTop + 40,
      })
      api.get(api.chatApi.sendMsg, 'get', db).then(res => {
        console.log("Res",res)
        if(res.result == 0){
          this.data.list[this.data.list.length - 1].reply = res.content;
          this.setData({
            list:this.data.list,
            scrollTop: this.data.scrollTop + 40,
          })
        }else{
          api.showToast('不知道为啥报错了')
          console.log("res",res)
        }
      }).catch(err => {})
    }else{
      api.showToast('别捉急，慢点点')
    }
  }
})