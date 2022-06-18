<template>
<div id="SwiperTop">
    <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in states.images" :key="image">
    <img :src="image.pic" />
    </van-swipe-item>
</van-swipe>
</div>
</template>
<script>
import {reactive,onMounted} from 'vue'
import axios from 'axios'
import {getBanner} from '@/request/api/home.js'
export default {
    setup() {
    const  states=reactive({
        images:[
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
    })
    onMounted(async () => {
        // axios.get('https://netease-cloud-music-api-iota-fawn.vercel.app/banner?type=2').then((res)=>{
        //     console.log(res);
        //     states.images=res.data.banners;
        // })
        let res=await getBanner();
        states.images=res.data.banners;
    })
    return { states };
},
}
</script>
<style lang="less">
#SwiperTop{
    .van-swipe{
    width:100%;
    height:3rem;
        .van-swipe-item{
            padding:0 .2rem;
            img{
                width:100%;
                height:100%;
                border-radius: .2rem;
            }
        }
    .van-swipe__indicator--active{
        background-color: rgb(219,130,130);
    }
}
}
</style>