// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    sentence:'Our teachers is so crazy that they left us so much work',
    translate:'我们老师留了那么多作业了真是疯了',
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
    wx.navigateTo({
      url: '../result/result?query=' + query
    })
  },
  onLoad: function (options) {
    //获取历史纪录
    let that = this;
    wx.request({
        url: "http://fragmentenglish.gsxab.top/api/history",
        method: "POST",
        header: {
          'Content-Type': 'json',
        },
        data: {
          userId: this.globalData.userInfo,
        },
        success: (res)=>{
          that.setData({"items": JSON.parse(res.data)});
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