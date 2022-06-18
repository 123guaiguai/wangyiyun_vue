<template>
    <div>
    <item-music-top :playlist="state.playlist"> </item-music-top>
    <item-music-content :songlist="state.songlist" :subscribedCount="state.playlist.subscribedCount"></item-music-content>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getAllSong } from "@/request/api/item.js";
import ItemMusicTop from "@/components/Item/ItemMusicTop.vue";
import ItemMusicContent from "@/components/Item/ItemMusicContent.vue"
export default {
    setup() {
    const state = reactive({
        playlist: {},
        songlist: [],
    });
    onMounted(async () => {
        let id = useRoute().query.id;
        let res = await getMusicItemList(id);
        state.playlist = res.data.playlist;
        sessionStorage.setItem("itemDetail", JSON.stringify(state));
        let result = await getAllSong(id);
        state.songlist = result.data.songs;
        // console.log(state.songlist);
    });
    return { state };
    },
    components: {
    ItemMusicTop,
    ItemMusicContent,
    },
};
</script>