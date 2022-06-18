<template>
  <div class="top-nav">
    <div class="top-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sliebiao"></use>
      </svg>
    </div>
    <div class="top-content">
      <span @click="jump">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="top-right">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
  </div>
</template>
<style lang="less" scoped>
.top-nav {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top-content {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
<script>
import {mapMutations,mapState} from "vuex";
export default {
  methods:{
    jump:function(){
        this.updataisPaused();
        this.$router.push('/userinfor');
    },
    ...mapMutations(["updataisPaused"])
  },
};
</script>
