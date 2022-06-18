<template>
  <div class="FooterMusic" v-if="isFooterShow">
    <div class="footerLeft" @click="updatadetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p class="song-name">{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnshow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sliebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      @canplay="canplaysong"
    ></audio>
  </div>
  <div style="overflow: hidden;; width: 0;height:0;">
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width:'100%' }"
    >
      <detail-music
        :musicdetail="playList[playListIndex]"
        :play="play"
        :isbtnshow="isbtnshow"
        :replay="replay"
        :load="load"
      ></detail-music>
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import DetailMusic from "@/components/Item/DetailMusic.vue";
export default {
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "isbtnshow",
      "detailShow",
      "currentTime",
      "isFooterShow",
      "duration",
      "isPaused",
    ]),
  },
  data() {
    return {
      InterVal: null, //获取歌曲已经播放时间的定时器函数的名字
    };
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  methods: {
    play() {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updataIsbtnShow(false);
      } else {
        this.$refs.audio.pause();
        this.updataIsbtnShow(true);
      }
    },
    getTime() {
      //定时器，每隔一秒拿到歌曲播放的时间
      this.InterVal = setInterval(() => {
        this.updataCurrentTime(this.$refs.audio.currentTime * 1000);
      }, 1000);
    },
    load(){
      this.$refs.audio.load();
    },
    canplaysong:function(){//audio的canplay事件使audio缓加载，这样拿到的duration才不是NAN
      this.updataDuration(this.$refs.audio.duration * 1000);
    },
    ...mapMutations([
      "updataIsbtnShow",
      "updatadetailShow",
      "updataCurrentTime",
      "updataDuration",
    ]),
  },
  watch: {
    playList: function () {
      this.$refs.audio.autoplay = true;
      this.updataIsbtnShow(false);
    },
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      this.updataIsbtnShow(false);
    },
    isbtnshow:function(){
      if(!this.isbtnshow)
      {
        this.getTime();//歌曲播放，调用getTime
        this.updataDuration(this.$refs.audio.duration * 1000);
      }else{
        clearInterval(this.InterVal); //歌曲暂停，清除定时器
      }
    },
    isPaused:function(){//isPaused改变，暂停底部组件的播放
      this.$refs.audio.pause();
      this.updataIsbtnShow(true);
    }
  },
  components: {
    DetailMusic,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .song-name {
      width: 3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>