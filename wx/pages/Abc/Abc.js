//var list = require('../../data/word-list.js');
var list = null;
const app = getApp();
var util = require('../../utils/md5.js');
Page({//添加了四个属性@Raineast
  data: {
    content:'',
    pron:'',
    definition:'',
    audio:'',
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
  onLoad: function (options) {//显示单词@Raineast
    this.getWordList();       //获取生词列表
  },
  showTheWord: function(list){
      if(list==null)
          return;
      var idx = Math.floor(Math.random() * Math.floor(list.length));
      var query = list[idx];     //随机给出需要显示单词的索引
      //对于每个单词重新发送一次查询请求@Raineast
      //搬运于result.js文件
      if(query=="")
          return;
      this.setData({'content': query});
      var that=this;
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
          },//搬运完毕
          success: (data)=>{
              var jsonStr = data.data.replace(/\ufeff/g, "");
              var jj = JSON.parse(jsonStr);
              //that.setData({ "query": jj.query });
              //that.data.query=jj.query;
              that.setData({ "translation": jj.translation });
              that.data.translation = jj.translation;
              that.data.tspeakurl = jj.tSpeakUrl;
              that.setData({ "tspeakurl": jj.tSpeakUrl });
              if(jj.basic == null)
                  return;
              if (jj.hasOwnProperty("basic")){
                  that.data.exist=true;
                  that.setData({'exist':true});
                  that.data.explains=jj.basic.explains;
                  that.setData({ "explains": jj.basic.explains });
                  if (jj.basic['uk-phonetic'] != null) {
                    that.data.ukphon = jj.basic['uk-phonetic'];
                    that.setData({ 'ukphon': jj.basic['uk-phonetic'] });
                  }
                  else{
                    that.data.ukphon = "";
                    that.setData({ 'ukphon': "" });
                  }
                  if (jj.basic['phonetic'] != null) {
                    that.data.phon = jj.basic['phonetic'];
                    that.setData({ 'phon': jj.basic['phonetic'] });
                  }
                  else{
                    that.data.phon = ""
                    that.setData({ 'phon':""});
                  }
                  if (jj.basic['us-phonetic'] != null) {
                    that.data.usphon = jj.basic['us-phonetic'];
                    that.setData({ 'usphon': jj.basic['us-phonetic'] });
                  }
                  else{
                    that.data.usphon = "";
                    that.setData({ 'usphon': "" });
                  }
              }
              if (jj.hasOwnProperty("web")) {
                  that.data.web=jj.web
                  that.setData({ 'web': jj.web});
              }
              that.data.webdict=jj.webdict
              that.data.dict.push=jj.dict
              that.setData({ 'webdict': jj.webdict });
              that.setData({ 'dict': jj.dict });
              that.setData({'definition': that.data.explains});
              if(jj.basic.explains == null)
                  that.setData({'explains': ""});
              if(that.data.phon != null){
                  that.setData({'pron': that.data.phon});
                  return;
              }
              else if(that.data.ukphon != null){
                  that.setData({'pron': that.data.ukphon});
                  return;
              }else if(that.data.usphon != null){
                  that.setData({'pron': that.data.usphon});
                  return;
              }else{
                  that.setData({'pron': " "});
              }
          },
          fail: (res)=>{
              console.log(app.globalData.userInfo);
              console.log(res);
          }
      });
  },
  getWordList: function(){
    //获取单词列表
    let that = this;
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
          list = res.data;
          this.showTheWord(list);
        },
        fail: (res)=>{
          console.log(res);
        }
    });
  },

  show: function () {
    this.setData({
      show: true
    })
  },

  next: function (list) {
    this.setData({
      show: false
    });
    this.getWordList();

    // this.setData({
    //   content: word.content,
    //   pron: word.pron,
    //   definition: word.definition,
    //   audio: word.audio
    // })

  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getWordList();
  },
})