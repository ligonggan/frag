// pages/notebook/notebook.js
const app = getApp();
var dict = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chara: [],
    wordlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getNotebook();
  },
  getNotebook: function(){//获取生词表
      var that = this;
      //var that=this
      wx.request({
        url: "https://fragmentenglish.gsxab.top/notebooks_dict",
        method: "POST",
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: app.globalData.userInfo
        },
        success: (res)=>{
          dict = res.data;
          var chara=[];
          var wordlist=[];
          for(var key in dict){
              if(key == "")
                continue;
              let l1 = chara.length;
              chara[l1] = key;
              let l2 = wordlist.length;
              wordlist[l2] = dict[key];
          }
          that.setData({'chara':chara});
          that.setData({'wordlist':wordlist});
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
    this.getNotebook();
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