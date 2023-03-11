// pages/common/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active:{
      type:Number,
      value:0
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    info:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //底部栏根据e.detail不同 跳转不同的界面
    onChange:function(e){
      if(e.detail==0){
        wx.switchTab({
          url: '/pages/index/index',
        })
      }else if(e.detail==1){
        wx.switchTab({
          url: '/pages/second/second',
        })
      }else if(e.detail==2){
        wx.switchTab({
          url: '/pages/msg/msg',
        })
      }else{
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }
    }
  }
})
