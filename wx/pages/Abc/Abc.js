var list = require('../../data/word-list.js')

Page({
  data: {
  },
  onLoad: function (options) {

    var idx = Math.floor(Math.random() * 499) + 1
    var word = list.wordList[idx]

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audio: word.audio
    })

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
    var idx = Math.floor(Math.random() * 499) + 1
    var word = list.wordList[idx]

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audio: word.audio
    })

  }
})