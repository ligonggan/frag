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
          success: (res)=>{
              var jsonStr = res.data.replace(/\ufeff/g, "");
              var jj = JSON.parse(jsonStr);
              that.setData({'content': query});
              that.setData({'definition': jj.basic.explains});
              that.setData({'pron': jj.basci.phon});
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

  next: function () {
    this.setData({
      showNot: false
    })
    var idx = Math.floor(Math.random() * Math.floor(list.length));
    var query = list[idx];

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
        success: (res)=>{
            var jsonStr = data.data.replace(/\ufeff/g, "");
            var jj = JSON.parse(jsonStr);
            that.setData({'content': query});
            that.setData({'definition': jj.basic.explains});
            that.setData({'pron': jj.basci.phon});
        },
        fail: (res)=>{
            console.log(app.globalData.userInfo);
            console.log(res);
        }
    });

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audio: word.audio
    })

  }
})