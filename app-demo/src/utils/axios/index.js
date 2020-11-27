import http from './axios';

//推荐歌单接口。
export function getPersonalized(params){
    return http.get('/personalized',{
        params
    })
}
//推荐最新音乐
export function getNewsong(){
    return http.get('/personalized/newsong');
}

//热门搜索列表
export function getHotSearch(){
    return http.get('/search/hot/detail');
}
//默认搜索关键词
export function getDefaultSearch(){
    return http.get('/search/default');
}
//搜索音乐
export function getSearch(params){
    return http.get('/cloudsearch',{
        params
    })
}
//获取轮播图数据
export function getBanner(){
    return http.get('/banner');
}
//获取热歌榜
export function getTop(params){
    return http.get('/top/list',{
        params,
    })
}
//获取歌单列表
export function getPlayList(params){
    return http.get('/playlist/detail',{
        params
    })
}