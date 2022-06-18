import { createStore } from 'vuex'
import { getMusciLyric } from '@/request/api/item';
export default createStore({
  state: {
    playList: [
      {
        al:{
          id: 130185746,
          name: "华北浪革",
          pic: 109951167261752750,
          picUrl: "http://p4.music.126.net/rDC1vd4RnngyLPmbjeffPg==/109951167261752746.jpg",
          pic_str: "109951167261752746",
        },
        id: 1459783374,
        ar:[
          {
            name:"刘森"
          }
        ],
        name:"焰火青年"
      },
    ],
    playListIndex: 0,//默认下标为0
    isbtnshow: true,//暂停按钮的显示,设置为全局变量
    detailShow: false,//是否显示歌词详情页
    detailShowComment:false,//是否显示歌曲评论
    lyricList:{},//歌词
    currentTime:0,//歌曲已经播放的时间
    duration:0,//歌曲的总时间
    isLogin:false,//判断是否登陆
    isFooterShow:true,//判断登陆和进入个人页面时底部音乐播放器是否显示
    isPaused:true,//判断跳转到个人页面是暂停底部组件音乐播放
    UserInfor:{},//获取用户的详情信息
    token:"",//拿到登陆时的token，防止刷新页面时登陆失效
  },
  getters: {
  },
  mutations: {
    updataIsbtnShow: function (state, value) {//改变底部暂停播放图标
      state.isbtnshow = value;
    },
    updataMusic: function (state, value) {//改变底部播放歌曲信息
      state.playList = value;
      // console.log(state.playList);
    },
    updataListIndex: function (state, value) {//改变歌曲的索引
      state.playListIndex = value;
    },
    updatadetailShow: function (state) {//歌曲详情页弹出层是否显示
      state.detailShow = !state.detailShow;
    },
    updataLyric:function(state,value){//获取歌词
      state.lyricList=value;
    },
    updataCurrentTime:function(state,value){//获取歌曲已经播放的时间
      state.currentTime=value;
    },
    updataDuration:function(state,value){//获取歌曲的总时间
      state.duration=value;
    },
    updataIsLogin:function(state,value){
      state.isLogin=value;
    },
    updatadetailShowComment:function(state)//歌曲讨论是否显示
    {
      state.detailShowComment=!state.detailShowComment;
    },
    updataisPaused:function(state){
      state.isPaused=!state.isPaused;
    },
    updataUserInfor:function(state,value){
      state.UserInfor=value;
    },
    updataToken:function(state,value){
      state.token=value;
    }
    },
  actions: {
    getLyric:async function(context,value){
      let res=await getMusciLyric(value);
      // console.log(res);
      context.commit("updataLyric",res.data.lrc);
    }
  },
  modules: {
  }
})
