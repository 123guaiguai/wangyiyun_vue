<template>
  <div>
    <img :src="musicdetail.al.picUrl" alt="" class="bgimg" />
  <div class="top">
    <div class="top-left">
      <svg class="icon" aria-hidden="true" @click="updatadetailShow">
        <use xlink:href="#icon-xitongfanhui"></use>
      </svg>
      <span class="infro">
        <Vue3Marquee class="song-name">
          {{ musicdetail.name }}
        </Vue3Marquee>
        <span class="container-ar">
          <span class="ar" v-for="item in musicdetail.ar" :key="item">{{
            item.name
          }}</span>
        </span>
      </span>
    </div>
    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="main" v-show="isLyricShow">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      :class="isbtnshow ? 'img_needle' : 'img_needle_active'"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicdetail.al.picUrl"
      alt=""
      class="img_song"
      :style="{ 'animation-play-state': isbtnshow ? 'paused' : 'running' }"
      @click="this.isLyricShow = false"
    />
  </div>
  <div
    class="MusicLyric"
    ref="musiclyric"
    @click="this.isLyricShow = true"
    v-show="!isLyricShow"
  >
    <p
      v-for="item in Lyric"
      :key="item"
      :class="
        item.time <= currentTime && item.next >= currentTime ? 'actives' : ''
      "
    >
      {{ item.lyr }}
    </p>
  </div>
  <div class="footer">
    <div class="footer-top">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-cdda"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="updatadetailShowComment">
        <use xlink:href="#icon-xinxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="Load">
        <use xlink:href="#icon-shuaxin"></use>
      </svg>
    </div>
    <div class="footer-middle">
      <input
        type="range"
        class="range"
        min="0"
        v-model="currentTime"
        :max="duration"
        step=".01rem"
      />
    </div>
    <div class="footer-tail">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huitui"></use>
      </svg>
      <svg class="icon go" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        style="width: 0.8rem; height: 0.8rem"
        @click="play"
        v-if="isbtnshow"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        style="width: 0.8rem; height: 0.8rem"
        @click="play"
        v-else
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon go" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_duoxuankuangzu
"></use>
      </svg>
    </div>
  </div>
  <div>
    <van-popup
      v-model:show="detailShowComment"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <Comment
        :comments="comment"
        :musicdetail="musicdetail"
        :total="total"
      ></Comment>
    </van-popup>
  </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
import animation from "../../../public/js/scroll.js";
import Comment from "@/components/Item/Comment.vue";
import { getComment } from "@/request/api/item.js";
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.js"
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.css"
export default {
  props: ["musicdetail", "isbtnshow", "play","load"],
  components: {
    Vue3Marquee,
    Comment,
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "isbtnShow",
      "playListIndex",
      "duration",
      "playList",
      "detailShow",
      "detailShowComment",
    ]),
    Lyric: function () {
      //对歌词的原数据的处理
      // console.log(this.lyricList.lyric)
      if (this.lyricList.lyric) {
        let arr;
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let minn =
            item.charAt(9) === "]" ? item.slice(7, 9) : item.slice(7, 10);
          let lyr = item.charAt(9) === "]" ? item.slice(10) : item.slice(11);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(minn);
          return { min, sec, minn, lyr, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 2) {
            //这时歌词来到最后一句
            item.next = this.duration; //next代表这句歌词的下一句歌词应该出现的时间
          } else if (i === arr.length - 1) {
            //此时歌曲进入留白，处理一下，防止冲突
            item.time = 0;
            item.next = 0;
          } else {
            item.next = arr[i + 1].time;
          }
        });
        // console.log(arr);
        return arr;
      }
    },
  },
  mounted() {
    this.opacity();
    this.Comment();
  },
  data() {
    return {
      isLyricShow: true,
      comment: [],
      total: 0,
    };
  },
  methods: {
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index === -1) {
        index = this.playList.length - 1;
      } else if (index === this.playList.length) {
        index = 0;
      }
      this.updataListIndex(index);
    },
    opacity() {
      let bg = document.querySelector(".bgimg");
      if (!this.detailShow) {
        bg.style.opacity = 0;
      } else {
        bg.style.opacity = 1;
      }
    },
    Comment: async function () {
      let res = await getComment(this.musicdetail.id);
      this.comment = res.data.hotComments;
      this.total = res.data.total;
      //console.log(this.comment);
    },
    Load:function(){
      this.load();
      this.play();
    },
    ...mapMutations([
      "updatadetailShow",
      "updataListIndex",
      "updataComment",
      "updatadetailShowComment",
    ]),
  },
  watch: {
    currentTime() {
      let p = document.querySelector(".actives");
      if (p != null) {
        let container = document.querySelector(".MusicLyric");
        // console.log([container]);
        // console.log([p]);
        let target = p.offsetTop - 260;
        animation(container, target);
        if (this.currentTime === this.duration) {
          this.load();
        }
      }
    },
    lyricList(){
      this.Comment();
    }
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(0.8rem);
}
.top {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .top-right {
    .icon {
      fill: #fff;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .top-left {
    display: flex;
    width: 60%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
    }
    .infro {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .song-name {
        width: 100%;
        color: #fff;
        height: 0.4rem;
      }
      .container-ar {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 0.04rem;
        color: #999;
        .ar {
          margin-right: 0.06rem;
        }
      }
    }
  }
}
.main {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 1s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 1s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_song {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.MusicLyric {
  display: flex;
  width: 100%;
  height: 9rem;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  transition: all 0.4s;
  p {
    margin-bottom: 0.4rem;
    color: rgb(217, 209, 209);
    transition: all 0.4s;
  }
  .actives {
    color: orange;
    // font-size: 0.38rem;
  }
}
.footer {
  width: 100%;
  height: 2.6rem;
  // border:1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.4rem;
  .footer-top {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: space-between;
    align-items: center;
    .icon {
      fill: #fff;
    }
  }
  .footer-middle {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    .range {
      width: 100%;
      height: 0.1rem;
    }
  }
  .footer-tail {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      fill: #fff;
    }
  }
}
</style>