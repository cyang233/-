const app = getApp();
const chatpath = 'https://api.qingyunke.com';
const hundredpath = 'https://api.tianapi.com';

//智能聊天接口
const chatApi = {
    sendMsg: chatpath + '/api.php', //聊天

}
// 每日一百次接口
const oneHundred = {
    hotword: hundredpath + '/hotword/index', //网络流行语
    charconvert:hundredpath + '/charconvert/index', //简繁转换
    caipu:hundredpath + '/caipu/index',  //菜谱
    surname: hundredpath + '/surname/index', //姓氏起源
    star: hundredpath + '/star/index', //星座运势
    story: hundredpath + '/story/index', //故事大全   
    zimi: hundredpath + '/zimi/index', //猜灯谜   
    tiangou: hundredpath + '/tiangou/index', //舔狗日记   
    key:'df9f8e3bc04a18b23e7b6d6b252d8f89', //密钥
}
// 封装请求方法
const request = (url, method, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            dataType: 'json',
            data: options.data,
            header: {
                "Content-Type": options.method === 'GET' ? "application/json" : "application/x-www-form-urlencoded"
            },
            success(request) {
                resolve(request.data);
                // wx.hideLoading();
            },
            fail(error) {
                reject(error.data)
                // wx.hideLoading();
            }
        })
    });
};
const get = (url, method, options = {}) => {
    return request(url, 'GET', {
        data: options
    })
}
const post = (url, method, options = {}) => {
    return request(url, 'POST', {
        data: options
    })
};
//公共弹框调用
const showToast = function (title, style) {

    let icon = '';

    if (style == undefined) {
        icon = 'none';
    } else if (style == 'success') {
        icon = 'success';
    } else {
        icon = 'loading';
    }

    wx.showToast({
        title: title,
        icon: icon,
        duration: 2000,
    });

};
//加载中的loading
const showLoading = function (title, isTrue) {
    wx.showLoading({
        title: title,
        mask: isTrue != undefined ? isTrue : true,
    });
};
//授权登录
const userLogin = function (e, callback, self) {
    /**
     * 这里that 只当前文件api.js
     */
    var that = this;
    wx.getUserInfo({
        desc: '用于完善用户资料',
        success: (res) => { //允许授权
            var rawData = JSON.parse(res.rawData)
            var signature = res.signature
            var iv = res.iv
            var encryptedData = res.encryptedData
            app.globalData.loginInfo = res.rawData;
            wx.setStorage({
                key: 'userInfo',
                data: e.detail.userInfo,
            });
            // const {rawData,signature,iv,encryptedData} = res
            wx.login({
                success(res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: that.urlList.wxLogin,
                            method: 'POST',
                            data: {
                                code: res.code,
                                rawData: JSON.stringify(rawData),
                                signature: signature,
                                iv: iv,
                                encryptedData: encryptedData,
                            },
                            success(res) {
                                if (res.data.code == 1) {
                                    app.globalData.loginIds = res.data.data;
                                    wx.setStorage({ //存储到本地
                                        key: "loginIds",
                                        data: res.data.data
                                    });
                                    that.showToast('登录成功！');
                                    setTimeout(() => {
                                        //判断传进来的是不是函数
                                        if (typeof callback == 'function') {
                                            /**成功之后的回调 */
                                            callback(self || '');
                                        };
                                    }, 800)
                                } else {
                                    that.showToast(res.data.msg);
                                    return;
                                };
                            }
                        })
                    } else {
                        console.log(res.errMsg)
                        // that.showToast('登录失败！' + res.errMsg);
                    }
                }
            })
        },
    })
};
module.exports = {
    get,
    post,
    showToast,
    showLoading,
    oneHundred,
    chatApi
};

//上一版本的登录
// if (e.detail.errMsg == 'getUserInfo:ok') { //允许授权

//     app.globalData.userInfo = e.detail.userInfo;

//     wx.setStorage({
//         key: 'userInfo',
//         data: e.detail.userInfo,
//     });
//     var db = {
//         session_key: that.getId('session_key'),
//         iv: e.detail.iv,
//         encryptedData: e.detail.encryptedData,
//     };

//     that.showLoading('请求中...');
//     that.post(that.urlList.DecryptDataUser, 'POST', db).then(res => {

//         wx.hideLoading();

//         if (res.code == 1) {
//             app.globalData.uid = res.data.uid; //用户id
//             app.globalData.openid = res.data.openId; //支付会用到
//             app.globalData.nickName = res.data.nickName; //用户昵称
//             let db = {
//                 uid: res.data.uid,
//                 openid: res.data.openId,
//                 nickName: res.data.nickName,
//             };
//             wx.setStorage({ //存储到本地
//                 key: "loginIds",
//                 data: db
//             });

//             that.showToast('登录成功！');
//             wx.navigateBack({
//                 detal: 1,
//             })
//             //判断传进来的是不是函数
//             if (typeof callback == 'function') {
//                 /**成功之后的回调 */
//                 callback(self || '');
//             };

//         } else {
//             that.showToast(res.msg);
//             return;
//         };
//     }).catch(err => {
//         wx.hideLoading();
//     })

// } else if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
//     //拒绝授权
//     that.showToast('您拒绝微信授权');
// };