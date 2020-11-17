//引入封装好的axios实例
import http from './axios';

//暴露管理接口

//菜单管理接口
//封装菜单添加接口
export function getMenuAdd(data) {
    return http.post('/menuadd',data);
}
//封装菜单列表接口
export function getMenuList(params){
    return http.get('/menulist',{
        params
    })
}
//封装菜单获取（一条）接口
export function getMenuInfo(params) {
    return http.get('/menuinfo',{
        params
    });
}
//封装菜单修改接口
export function getMenuEdit(data) {
    return http.post('/menuedit',data);
}
//封装菜单删除接口
export function getMenuDelete(data) {
    return http.post('/menudelete',data);
}

//角色管理接口

//角色添加
export function getRoleAdd(data){
    return http.post('/roleadd',data);
}
//角色列表
export function getRoleList(){
    return http.get('/rolelist');
}
//角色获取一条数据
export function getRoleInfo(params){
    return http.get('/roleinfo',{
        params
    });
}
//角色修改
export function getRoleEdit(data){
    return http.post('/roleedit',data);
}
//角色删除
export function getRoleDelete(data){
    return http.post('/roledelete',data);
}


//管理员管理接口
//管理员添加
export function getUserAdd(data){
    return http.post('/useradd',data);
}
//管理员总数
export function getUserCount(){
    return http.get('/usercount');
}
//管理员列表
export function getUserList(params){
    return http.get('/userlist',{
        params
    });
}
//管理员数据一条数据
export function getUserInfo(params){
    return http.get('/userinfo',{
        params
    });
}
//管理员修改
export function getUserEdit(data){
    return http.post('/useredit',data);
}
//管理员删除
export function getUserDelete(data){
    return http.post('/userdelete',data);
}
//管理员登录
export function getUserLogin(data){
    return http.post('/userlogin',data);
}

//商品分类管理
//分类添加
export function getCateAdd(data){
    return http.post('/cateadd',data)
}
//分类列表
export function getCateList(params){
    return http.get('/catelist',{
        params
    });
}
//分类获取一条数据
export function getCateInfo(params){
    return http.get('/cateinfo',{
        params
    });
}
//分类修改
export function getCateEdit(data){
    return http.post('/cateedit',data);
}
//分类删除
export function getCateDelete(data){
    return http.post('/catedelete',data);
}

// 规格接口
//规格添加
export function getSpecsAdd(data){
    return http.post('/specsadd',data)
}
//规格总数
export function getSpecsCount(){
    return http.get('/specscount')
}
//规格列表
export function getSpecsList(params){
    return http.get('/specslist',{
        params
    });
}
//规格数据获取一条
export function getSpecsInfo(params){
    return http.get('/specsinfo',{
        params
    })
}
//规格修改
export function getSpecsEdit(data){
    return http.post('/specsedit',data);
}
//规格删除
export function getSpecsDelete(data){
    return http.post('/specsdelete',data);
}

//商品管理接口
//商品添加
export function getGoodsAdd(data){
    return http.post('/goodsadd',data);
}
//商品总数
export function getGoodsCount(){
    return http.get('/goodscount');
}
//商品列表
export function getGoodsList(params){
    return http.get('goodslist',{
        params
    });
}
//商品获取一条数据
export function getGoodsInfo(params){
    return http.get('/goodsinfo',{
        params
    });
}
//商品修改
export function getGoodsEdit(data){
    return http.post('/goodsedit',data);
}
//商品删除
export function getGoodsDelete(data){
    return http.post('/goodsdelete',data);
}

//会员管理接口
//会员列表
export function getMemberList(){
    return http.get('/memberlist');
}
//会员获取一条数据
export function getMemberInfo(params){
    return http.get('/memberinfo',{
        params
    });
}
//会员修改
export function getMemberEdit(data){
    return http.post('memberedit',data);
}

//轮播图管理接口
//轮播图添加
export function getBannerAdd(data){
    return http.post('banneradd',data);
}
//轮播图列表
export function getBannerList(){
    return http.get('bannerlist');
}
//轮播图获取一条数据
export function getBannerInfo(params){
    return http.get('/bannerinfo',{
        params
    });
}
//轮播图修改
export function getBannerEdit(data){
    return http.post('/banneredit',data);
}
//轮播图删除
export function getBannerDelete(data){
    return http.post('/bannerdelete',data);
}


//限时秒杀管理接口
//限时秒杀添加
export function getSeckAdd(data){
    return http.post('/seckadd',data);
}
//限时秒杀列表
export function getSeckList(){
    return http.get('/secklist');
}
//限时秒杀获取一条数据
export function getSeckInfo(params){
    return http.get('/seckinfo',{
        params
    });
}
//限时秒杀修改
export function getSeckEdit(data){
    return http.post('/seckedit',data);
}
//限时秒杀删除
export function getSeckDelete(data){
    return http.post('/seckdelete',data);
}