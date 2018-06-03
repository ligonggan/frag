// pages/notebook/notebook.js
const app = getApp();
var list = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chara:['A','B','C','D','E','F','G','H'],
    wordlist: [ ['Abc','adc'],['bca'],['cda'],[],[],[],[],[]],
    show:[true,true,false,false,false],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getNotebook();
  },
  getNotebook: function(){//获取生词表
      console.log(app.globalData.userInfo);
      var that = this;
      //var that=this
      wx.request({
        url: "http://fragmentenglish.gsxab.top/api/notebooks",
        method: "POST",
        header: {
          'Content-Type': 'json',
        },
        data: {
          userId: this.globalData.userInfo
        },
        success: (res)=>{
          console.log(res);
          console.log(res.data);
          list = JSON.parse(res.data);
        },
        fail: (res)=>{
          console.log(res);
        }
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})