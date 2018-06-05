//app.js
var util = require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) {
          this.globalData.userInfo = "0000000000000000000000000000";
          console.log('获取用户登录凭证：' + code);
        }
      }
    })
    this.globalData.userInfo = "0000000000000000000000000000";
  },
    // 获取用户信息
    getUserInfo: function(cb) {
      var that = this;
      if (this.globalData.user) {
        typeof cb == "function" && cb(this.globalData.user)
      } else {
        //调用登录接口  
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.user = res.userInfo;
                typeof cb == "function" && cb(that.globalData.user)
              }
            })
          }
        });
      }
   //if(this.globalData.userInfo==null)
   
  },
  globalData: {
    userInfo: null,
    user:null
  }
})