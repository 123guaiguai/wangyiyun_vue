<template>
  <div class="Top">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-xitongfanhui"></use>
    </svg>
    <input
      type="text"
      placeholder="许嵩"
      class="searchbox"
      @keydown.enter="enterKey"
      v-model="HistoryKey"
    />
  </div>
  <div class="history">
    <span class="title">历史</span>
    <span class="historykey" v-for="item in HistoryKeyList" :key="item" @click="gethistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="deletehistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="Main">
    <SongList :songlist="SearchList"></SongList>
  </div>
</template>
<script>
import {getSearchMusic} from '@/request/api/home.js'
import SongList from '@/components/Item/SongList.vue'
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.js"
import "@/assets/iconfont/font_3439707_zunm201gu6b/iconfont.css"
export default {
    data() {
        return {
            HistoryKeyList: [],
            HistoryKey: "",
            SearchList: [],
        };
    },
    mounted() {
        this.HistoryKeyList = JSON.parse(localStorage.getItem("HistoryKeyList"));
    },
    methods: {
        enterKey: async function () {
            if (this.HistoryKey !== "") {
                this.HistoryKeyList = this.HistoryKeyList || [];
                this.HistoryKeyList.unshift(this.HistoryKey);
                this.HistoryKeyList = [...(new Set(this.HistoryKeyList))];
                if (this.HistoryKeyList.length > 5) {
                    this.HistoryKeyList.pop();
                }
                localStorage.setItem("HistoryKeyList", JSON.stringify(this.HistoryKeyList));
                let res = await getSearchMusic(this.HistoryKey);
                // console.log(res);
                this.SearchList = res.data.result.songs;
                this.HistoryKey = "";
            }
        },
        deletehistory: function () {
            localStorage.removeItem("HistoryKeyList");
            this.HistoryKeyList = [];
        },
        gethistory: async function (value) {
            let res = await getSearchMusic(value);
            // console.log(res);
            this.SearchList = res.data.result.songs;
        }
    },
    components: { SongList }
};
</script>
<style lang="less" scoped>
.Top {
  width: 100%;
  height: 0.6rem;
  padding: 0.4rem 0.1rem;
  display: flex;
  align-items: center;
  .icon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .searchbox {
    width: 90%;
    height: 100%;
    border: none;
    border-bottom: 2px solid #999;
    padding: 0.3rem 0.2rem;
  }
}
.history {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  flex-flow: wrap;
  position: relative;
  .title {
    font-weight: 700;
  }
  .icon {
    position: absolute;
    right: 0.1rem;
    width: 0.4rem;
    height: 0.4rem;
  }
  .historykey {
    line-height: 0.38rem;
    text-align: center;
    background: rgba(215, 207, 204);
    border-radius: 0.3rem;
    padding: 0.06rem 0.10rem;
    margin: 0 0.2rem;
    margin-bottom: 0.04rem;
    display: inline-block;
  }
}
.Main{
  width:100%;
  padding:.2rem;
}
</style>