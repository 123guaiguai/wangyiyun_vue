<template>
  <svg class="icon" aria-hidden="true" @click="this.$router.push('/')">
    <use xlink:href="#icon-xitongfanhui"></use>
  </svg>
  个人中心
</template>
<style lang="less" scoped>
.icon{
    width:.6rem;
    height:.6rem;
    fill:red;
    border:.04rem solid red;
    border-radius: 50%;
}

</style>
<script>
import {mapMutations,mapState} from 'vuex'
export default {
    computed:{
      
      ...mapState(["UserInfor"])//拿到个人信息
    }
}
</script>