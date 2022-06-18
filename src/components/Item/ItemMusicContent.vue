<template>
  <div class="container">
    <div class="top">
      <span class="top-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <span class="title"> 播放全部 </span>
        <span class="number"> (共30首) </span>
      </span>
      <span class="top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏{{ subscribedCount }}</span>
      </span>
    </div>
    <div class="main">
        <song-list :songlist="songlist"></song-list>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import SongList from "@/components/Item/SongList.vue"
export default {
    setup(props) { },
    methods: {
        playMusic(i) {
            this.updataMusic(this.songlist);
            this.updataListIndex(i);
        },
        ...mapMutations(["updataMusic", "updataListIndex"]),
    },
    props: ["songlist", "subscribedCount"],
    components: { SongList }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 10rem;
  padding: 0.2rem;
  background-color: rgba(255, 255, 255);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      width: 55%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      .icon {
        margin-right: 0.1rem;
      }
      .title {
        font-size: 0.36rem;
        font-weight: 700;
      }
      .number {
        font-size: 0.28rem;
        color: rgba(169, 172, 176);
      }
    }
    .top-right {
      width: 30%;
      height: 80%;
      display: flex;
      padding: 0.1rem;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 24, 0);
      border-radius: 0.4rem;
      margin-right: 0.1rem;
      span {
        color: #fff;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .main {
    width: 100%;
  }
}
</style>