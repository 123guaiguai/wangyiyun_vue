import service from '..'
//获取歌单详情页数据
export function getMusicItemList(data) {
    return service({
        method: "GET",
        url: '/playlist/detail?id=' + data,
    })
}
//获取歌单所有歌曲
export function getAllSong(data) {
    return service({
        method: 'GET',
        url: '/playlist/track/all?id=' + data + '&limit=30&offset=1',
    })
}
//获取歌曲的歌词
export function getMusciLyric(data) {
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`,
    })
}
//获取歌曲的评论
export function getComment(data) {
    return service({
        method: 'GET',
        url: `/comment/music?id=${data}&limit=1`,
    })
}