<template>
  <div>
    <router-view />
    <footer-music></footer-music>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  .icon {
  width: .5rem;
  height: .5rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<script>
import FooterMusic from "@/components/Item/FooterMusic.vue";
export default {
  components: {
    FooterMusic,
  },
};
</script>
