<template>
  <div class="item" v-for="(item, i) in songlist" :key="i">
    <div class="item-left" @click="playMusic(i)">
      <span class="index">{{ i + 1 }}</span>
      <span class="infro">
        <span class="song-name">
          {{ item.name }}
        </span>
        <span class="arlist">
          <span class="author" v-for="(it, i) in item.ar" :key="i">
            {{ it.name }}
          </span>
        </span>
      </span>
    </div>
    <div class="item-right">
      <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sliebiao"></use>
      </svg>
    </div>
  </div>
</template>
<style lang="less" scoped>
.item {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    .index {
      color: rgb(204, 204, 208);
      margin-right: 0.1rem;
    }
    .infro {
      width: 99%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .song-name {
        width: 100%;
        white-space: nowrap;
        font-weight: 550;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .arlist {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .author {
          color: rgba(169, 172, 176);
          font-size: 0.24rem;
          margin-right: 0.04rem;
        }
      }
    }
  }
  .item-right {
    .bofang {
      margin-right: 0.4rem;
    }
  }
}
</style>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["songlist"],
  methods: {
    playMusic(i) {
      this.updataMusic(this.songlist);
      this.updataListIndex(i);
    },
    ...mapMutations(["updataMusic", "updataListIndex"]),
  },
};
</script>