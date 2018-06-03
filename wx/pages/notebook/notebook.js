// pages/notebook/notebook.js
const app = getApp();

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
      this.getNotebook((data)=>{this.setData(data);});
  },
  getNotebook: function(callback){
      console.log(app.globalData.userInfo);
      //var that=this
      wx.request({
        url: "https://fragmentenglish.gsxab.top/api/notebooks",
        method: "POST",
        dataType: "application/json",
        data: {
          token: app.globalData.userInfo
        },
        success: (res)=>{
          console.log(res);
          console.log(res.data);
          this.setData({"wordlist": res.data});
          callback();
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