var util = require('../../utils/md5.js') 
// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    op:true,
    totrans: "",
    transre: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.op=true;
  },
  searchValue: function (e) {
    this.setData({
      totrans: e.detail.value
    })
  },
  changelan: function (event) {
    console.log("click")
    var s = 'op'
    var param = {};
    console.log(this.op)
    if(this.op==true) 
    {
      param[s] = false;
      this.op=false;
      console.log("false")
    }
    else{
      this.op = true;
      param[s] = true;
    }
    this.setData(param);
    console.log(this.op)

  },
  trans:function(event){
    var query = this.data.totrans
    console.log(query)
    var that = this
    var appKey = '6d963f5e7cb10b13';
    var key = 'oWLnbiqEGyUsZLNGwt73RiL5VReRNZLA';//注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'zh-CHS';
    var to = 'en';
    if(this.data.op){
      from=to
      to='zh-CHS'
    }
    var str1 = appKey + query + salt + key;
    var sign = util.md5(str1);
    wx.request({
      url: 'https://openapi.youdao.com/api',
      type: 'post',
      dataType: 'jsonp',
      data: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: function (data) {
        var jsonStr = data.data.replace(/\ufeff/g, "")
        var jj = JSON.parse(jsonStr);
        that.data.transre=jj;
        console.log(jj)
        that.setData({"transre":jj.translation});
      }
    }
    );
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