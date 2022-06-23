<template>
  <div class="Comment-Top">
    <div class="top-left">
      <svg class="icon" aria-hidden="true" @click="updatadetailShowComment">
        <use xlink:href="#icon-xitongfanhui"></use>
      </svg>
      <span class="title"> 评论({{ total }}) </span>
    </div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-fenxiang"></use>
    </svg>
  </div>
  <div class="descript">
    <img :src="musicdetail.al.picUrl" alt="" />
    <div class="infor">
      <span class="song-name">
        {{ musicdetail.name }}
      </span>
      <span class="ar">
        (<span class="ar-song" v-for="item in musicdetail.ar" :key="item">{{
          item.name
        }}</span
        >)
      </span>
    </div>
  </div>
  <div class="line"></div>
  <div class="main">
    <div class="main-top">
      <span style="font-weight: 700">评论区</span>
      <div class="right">
        <span style="font-weight: 700; color: #000">推荐</span>
        <span>最热</span>
        <span>最新</span>
      </div>
    </div>
    <div v-for="item in comments" :key="item" class="deliver">
      <div class="header">
        <img :src="item.user.avatarUrl" alt="" />
        <span class="name-time">
          <span class="name">
            {{ item.user.nickname }}
          </span>
          <span class="time">
            {{ item.timeStr }}
          </span>
        </span>
        <div class="dizan">
          <span class="count">{{ item.likedCount }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-good"></use>
          </svg>
        </div>
      </div>
      <div class="middle">
        {{item.content}}
      </div>
      <div class="footer">
        <span class="recall">
          20条回复
        </span>
        <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-youjiantou"></use>
    </svg>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Comment-Top {
  width: 100%;
  height: 0.6rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  .top-left {
    width: 50%;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 0.4rem;
    }
    .title {
      font-weight: 700;
    }
  }
}
.descript {
  width: 100%;
  height: 1.6rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  img {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    border: 0.2rem solid rgb(38, 38, 38);
  }
  .infor {
    width: 70%;
    margin-left: 0.2rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .song-name {
      margin: 0 0.06rem;
    }
    .ar {
      color: rgba(183, 183, 183, 0.5);
      .ar-song {
        margin-right: 0.06rem;
        font-size: 0.26rem;
      }
    }
  }
}
.line {
  width: 95%;
  height: 0.2rem;
  background: rgba(247, 247, 247);
}
.main {
  width: 100%;
  padding: 0.2rem;
  .main-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .right {
      width: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ccc;
      margin-right: 0.6rem;
    }
  }
  .deliver {
    width: 100%;
    margin-bottom:.2rem;
    .header {
      position: relative;
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
      .name-time {
        height: 0.8rem;
        margin-left: 0.12rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          color: rgb(102, 102, 102);
        }
        .time {
          color: rgb(180, 180, 180);
          font-size: 0.2rem;
        }
      }
      .dizan {
        position: absolute;
        right: 0.4rem;
        display: flex;
        align-items: center;
        .count {
          color: rgb(180, 180, 180);
          font-size: 0.2rem;
        }
        .icon{
          width:.36rem;
          height:.36rem;
          fill:rgb(180, 180, 180);
          margin-left:.04rem;
        }
      }
    }
    .middle{
      width:80%;
      display:flex;
      flex-wrap: wrap;
      margin-left:.86rem;
    }
    .footer{
      width:80%;
      margin-left:.86rem;
      color:rgb(115, 142, 177);
      display:flex;
      align-items: center;
      margin-top:.1rem;
      padding-bottom:.16rem;
      border-bottom:.02rem solid rgb(232, 230, 230);
      .icon{
        margin-left:.08rem;
        width:.32rem;
        height:.32rem;
        fill:rgb(115, 142, 177);
      }
    }
  }
}
</style>
<script>
import { mapMutations } from "vuex";
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.js"
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.css"
export default {
  methods: {
    ...mapMutations(["updatadetailShowComment"]),
  },
  //comments是评论，musicdetail是歌曲信息，total是评论总数
  props: ["comments", "musicdetail", "total"],
};
</script>

