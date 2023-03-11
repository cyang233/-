
const http = function http(url,method,data){
  var p = new Promise(function(resolve,reject){
    wx.request({
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      url:url,
      method:method,
      data:data,
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
  return p;
}
module.exports = {
  http:http
}