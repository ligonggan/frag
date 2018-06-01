const app = getApp();

Page({
  data: {
    daily: {
      en: "",
      cn: "",
      audio: ""
    },
    history: [{
      word: 'hello',
      definition_cn: ''
    }, {
      word: 'world',
      definition_cn: ''
    }]
  },
  onLoad: function() {
    this.getHistory((data)=>{this.setData(data);});
  },
  getHistory: function(callback) {
    console.log(app.globalData.userInfo);
    wx.request({
      url: "https://fragmentenglish.gsxab.top/api/history",
      method: "GET",
      data: {
        token: getApp().globalData.userInfo,
      },
      success: (res)=>{
        console.log(res);
        console.log(res.data);
        this.setData({"words": res.data});
        callback();
      },
      fail: (res)=>{
        console.log(res);
      }
    });
  }
})