// pages/hundredList/hundredList.js
import api from '../../api/api';
Page({
  data: {
      list:[
        {img:'../../images/default.png',title:'网络流行语'},
        {img:'../../images/default.png',title:'简繁转换'},
        {img:'../../images/default.png',title:'菜谱查询'},
        {img:'../../images/default.png',title:'姓氏起源'},
        {img:'../../images/default.png',title:'星座运势'},
        {img:'../../images/default.png',title:'故事大全'},
        {img:'../../images/default.png',title:'猜灯谜'},
        {img:'../../images/default.png',title:'藏头诗'},
        {img:'../../images/default.png',title:'舔狗日记'}
      ],
      checkedList:[],
      active:1,
      transformClass: false, //翻转照片
      transformClass1:false,
    },

  onLoad: function (options) {

  },

  onShow: function () {
    console.log("123",this.data)
    this.setData({
      active:1,
      transformClass:false
    })
  },
  // 翻转图片
  clickImg(e) {
    const index = e.currentTarget.dataset.index
    console.log("index",index)
      this.setData({
        active: index,
        transformClass: true
      })
      setTimeout(()=>{
        console.log("12",this.itemPath(index))
        if(index != 7){
          wx.navigateTo({
            url: this.itemPath(index),
          })
        }else{
          api.showToast('这个要收费，暂时不做')
        }
      },3000)
  },
  itemPath(ind){
    switch (ind){
      case 0:
        return './networkWord/networkWord';
      case 1:
        return './eazy/eazy';
      case 2:
        return './menu/menu';
      case 3:
        return './nameHistory/nameHistory';
      case 4:
        return './constellation/constellation';
      case 5:
        return './story/story';
      case 6:
        return './lanternRiddles/lanternRiddles';
      case 7:
        return 1;
      case 8:
        return './dogDiary/dogDiary'
    }
  }
})