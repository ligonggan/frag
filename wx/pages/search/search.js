// pages/search/search.js
const app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    sentence:'You are not in charge of the universe; you are in charge of yourself.',
    translate:'你并不掌管整个宇宙，但你得掌管你自己。',
    items: ["homework","too","much","teacher","killer"]
  
  },
  searchValue:function(e){
    this.setData({
      searchValue:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  search:function(event){
    var query = this.data.searchValue
    if(query.trim()=='') return;
    wx.navigateTo({
      url: '../result/result?query=' + query
    })
  },
  onLoad: function (options) {
    //获取历史纪录
    let that = this;
    wx.request({
        url: "https://fragmentenglish.gsxab.top/history",
        method: "POST",
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: app.globalData.userInfo,
        },
        success: (res)=>{
          that.setData({"items": res.data});
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
    this.onLoad();
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
  
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})