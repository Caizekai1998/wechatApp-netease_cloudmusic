// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:0,
    tab:0,
    swiperImg:['/images/banner.jpg','/images/banner.jpg','/images/banner.jpg'],
    //热门音乐
    hotSong:[{
      imgUrl:'/images/cover.jpg',
      songName:'说好不哭'
    },{
      imgUrl:'/images/cover.jpg',
      songName:'一路向北'
    },{
      imgUrl:'/images/cover.jpg',
      songName:'超人'
    },{
      imgUrl:'/images/cover.jpg',
      songName:'大笨钟'
    },{
      imgUrl:'/images/cover.jpg',
      songName:'晴天'
    },{
      imgUrl:'/images/cover.jpg',
      songName:'修炼爱情'
    }],
    //播放列表
    playlist:[{
      id:1,
      title:'说好不哭',
      singer:'周杰伦',
      src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      coverImgUrl:'/images/cover.jpg'
    },{
        id:2,
        title:'一路向北',
        singer:'周杰伦',
        src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        coverImgUrl:'/images/cover.jpg'
    },{
      id:3,
        title:'晴天',
      singer:'周杰伦',
      src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      coverImgUrl:'/images/cover.jpg'
    },{
      id:4,
        title:'修炼爱情',
      singer:'林俊杰',
      src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      coverImgUrl:'/images/cover.jpg'
    },{
      id:5,
        title:'超人',
      singer:'五月天',
      src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      coverImgUrl:'/images/cover.jpg'
    },{
      id:6,
      title:'借口',
      singer:'周杰伦',
      src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      coverImgUrl:'/images/cover.jpg'
    }],
    //当前播放歌曲
    state:'paused',
    playIndex:0,
    play:{
      currentTime:'00:00',
      duration:'00:00',
      percent:0,
      title:'',
      singer:'',
      coverImgUrl:'/images/cover.jpg',
  }
},

  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
      })
    },
    changeTab:function(e){
      this.setData({
        tab:e.detail.current
      })
    },
    play:function(){
      this.audioCtx.play()
      this.setData({ state:'running'})
    },
    pause:function(){
      this.audioCtx.pause()
      this.setData({state:'paused'}) 
    },
  
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  audioCtx:null,
  onReady: function () {
  this.audioCtx = wx.createInnerAudioContext()
    var that=this
    this.audioCtx.onError(function(){
      console.log('播放失败'+that.audioCtx.src)
      }
    )
      //播完一首歌，自动切歌
      this.audioCtx.onEnded(function(){
        that.next()
      })

      //自动更新播放进度
      this.audioCtx.onTimeUpdate(function(){
        that.setData({
          'play.currentTime':formatTime(that.audioCtx.currentTime) ,
          'play.duration':formatTime(that.audioCtx.duration),
          'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
        })
      })

      //格式化时间
      function formatTime(time){
        var minute=Math.floor(time/60)
        var second=Math.floor(time)%60
        return(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
      }

    //默认播第一首歌
    this.setMusic(0)
  },
  setMusic:function(index){
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    })
  },
  playMusic:function(){
    this.audioCtx.play()
    this.setData({state:'running'})
  },
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:'paused'})
  },
  //下一首
  next:function(){
    var index= this.data.playIndex >= this.data.playlist.length-1? 0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state === 'running'){
      this.play()
    }
  },
  //进度条拖动时
  sliderChange:function(e){
    var second=this.audioCtx.duration*e.detail.value/100
    this.audioCtx.seek(second)
  },
  //单击切换播放列表
  changpage:function(e){
    this.setData({
      tab:e.target.dataset.page,
      item:e.target.dataset.page
    })
  },
  //播放列表，切歌
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.playMusic()
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