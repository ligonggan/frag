// pages/notebook/notebook.js
const app = getApp();
var list = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chara: [],
    temp:['A','B','C','D','E','F','G','H','I','J','K','L','M,','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    wordlist: [ ['Abc','adc'],['bca'],['cda'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    //show:[true,true,false,false,false],
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
        url: "https://fragmentenglish.gsxab.top/notebooks",
        method: "POST",
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: app.globalData.userInfo
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
  // arrage: function(){
  //   //对生词表进行排列@Raineast
  //   if(list==null)
  //     return;
  //   for(var i=0;i<list.length;i++){
  //     list[i]
  //   }
  // },
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