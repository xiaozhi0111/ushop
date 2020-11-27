import http from './axios';

//获取轮播图数据。
export function getBannerList(){
    return http.get('/getbanner');
}
export function getIndexGoods(){
    return http.get('/getindexgoods');
}
//获取商品详情数据。
export function getGoodsDetile(params){
    return http.get('/getgoodsinfo',{
        params
    });
}
//获取分类数据。
export function getCateTree(){
    return http.get('getcatetree');
}
//获取一个获取一类商品数据
export function getGoods(params){
    return http.get('/getgoods',{
        params
    });
}
//会员注册
export function goRegister(data){
    return http.post('/register',data);
}
//会员登录
export function goLogin(data){
    return http.post('/login',data);
}
//根据uid获取购物车列表。
export function cartList(params){
    return http.get('/cartlist',{
        params
    });
}
//购物车添加
export function cartAdd(data){
    return http.post('/cartadd',data);
}