// pages/result/result.js
var util = require('../../utils/md5.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:0,
    exist:false,
    query:"",
    translation:"",
    web:[],
    dict:[],
    webdict:[],
    tspeakurl:'',
    explains:[],
    usphon:'',
    phon:'',
    ukphon:'',
    usspeech:'',
    ukspeech:'',
    action: {
      method: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var query=options.query
    this.setData({'query':query})
    var that=this
    var appKey = '6d963f5e7cb10b13';
    var key = 'oWLnbiqEGyUsZLNGwt73RiL5VReRNZLA';//注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh-CHS';
    var reg = /^[\u4e00-\u9fa5]+$/;
    if (reg.test(query)) {
      from = 'zh-CHS';
      to = 'en';
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
        console.log(jj)
        that.setData({ "query": jj.query });
        that.data.query=jj.query;
        that.setData({ "translation": jj.translation });
        that.data.translation = jj.translation;
        that.data.tspeakurl = jj.tSpeakUrl
        that.setData({ "tspeakurl": jj.tSpeakUrl });
        if (jj.hasOwnProperty("basic")){
          that.data.exist=true;
          that.setData({'exist':true});
          that.data.explains=jj.basic.explains
          that.setData({ "explains": jj.basic.explains });
          console.log(that.data.explains)
          that.data.ukphon = jj.basic['uk-phonetic']
          that.setData({ 'ukphon': jj.basic['uk-phonetic'] });
          that.data.phon = jj.basic['phonetic']
          that.setData({ 'phon': jj.basic['phonetic'] });
          that.data.usphon = jj.basic['us-phonetic']
          that.setData({ 'usphon': jj.basic['us-phonetic'] });
          that.data.ukspeech = jj.basic['uk-speech']
          that.setData({ 'ukspeech': jj.basic['uk-speech'] });
          that.data.usspeech = jj.basic['us-speech'];
          that.setData({ 'usspeech': jj.basic['us-speech'] });
        }
        if (jj.hasOwnProperty("web")) {
          that.data.web=jj.web
          that.setData({ 'web': jj.web});
        }
          that.data.webdict=jj.webdict
          that.data.dict.push=jj.dict
          that.setData({ 'webdict': jj.webdict });
          that.setData({ 'dict': jj.dict });
      },
      fail :function(data){
        that.setData({ "query": data.code});
      }
    });
  },
  changesel:function (event) {
    this.data.selected = 1-this.data.selected;
    this.setData({ 'selected': this.data.selected });
  },
  playuk:function(event){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src =this.data.ukspeech
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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