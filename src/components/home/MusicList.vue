<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="100" :show-indicators="false" class="my-swiper">
                <van-swipe-item v-for="item in musiclist" :key="item" class="my-item">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id} }">
                        <img :src="item.picUrl" alt="">
                    <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gl-play"></use>
                    </svg>
                    {{getplayCount(item.playCount)}}
                    </span>
                    <span class="name">{{item.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<style lang="less" scoped>
.musicList{
    width:100%;
    height:5rem;
    padding:.2rem;
    .musicTop{
        width:100%;
        height:.6rem;
        display:flex;
        justify-content: space-between;
        margin-bottom: .2rem;
        .title{
            font-size:.4rem;
            font-weight:900;
        }
        .more{
            border:1px solid #ccc;
            text-align:center;
            line-height:.6rem;
            padding:0 .2rem;
            border-radius:.4rem;
        }
    };
    .musicContent{
        width:100%;
        height:4rem;
        .my-swiper{
            height:100%;
            .my-item{
                position:relative;
                margin:0 .2rem;
                height:100%;
                img{
                width:100%;
                height:2.2rem;
                border-radius: .2rem;
                }
                .playCount{
                    color:white;
                    font-size:.2rem;
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    position:absolute;
                    left:.6rem;
                    top:.1rem;
                    .icon{
                        width:.4rem;
                        height:.4rem;
                    }
                };
                .name{
                    font-size:.24rem;
                    color:rgba(120, 120, 120);
                }
            }
        }
    }
}
</style>
<script>
import {getMusicList} from "@/request/api/home.js"
import {onMounted,reactive} from 'vue'
export default {
   // 这里获取数据采用一下vue2的写法
    data(){
        return {
            musiclist:[]
        }
    },
    methods:{
        async getGeDan(){
            let res=await getMusicList()
            this.musiclist=res.data.result;
        },
        getplayCount(num){
            if(num>=100000000)
            {
                return (num/100000000).toFixed(1)+'亿';
            }else if(num>=10000)
            {
                return (num/10000).toFixed(1)+'万';
            }
        }
    },
    mounted(){
        this.getGeDan();
    },
    //这是vue3的写法
    // setup(){
    //     const state=reactive({
    //         musiclist:{}
    //     })
    //     onMounted(async ()=>{
    //         let res=await getMusicList();
    //         state.musiclist=res.data.result;
    //     })
    //     function getplayCount(num){
    //         if(num>=100000000)
    //         {
    //             return (num/100000000).toFixed(1)+'亿';
    //         }else if(num>=10000)
    //         {
    //             return (num/10000).toFixed(1)+'万';
    //         }
    //     }
    //     return [state,getplayCount]
    // }
}
</script>