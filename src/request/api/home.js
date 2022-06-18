import service from '..'
//获取首页轮播图的图片数据
export function getBanner(){
    return  service({
        method:'GET',
        url:"/banner?type=2"
    })
}
//获取发现好歌单的数据
export function getMusicList(){
    return service({
        method:"GET",
        url:'/personalized?limit=10',
    })
}
//获取搜索关键字的返回值
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`,
    })
}
//获得登陆的信息
export function getLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`,
    })
}
//获得用户的详情信息，以渲染到个人页面
export function getUserInfor(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`,
    })
}