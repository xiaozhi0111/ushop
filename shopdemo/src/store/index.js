import Vue from 'vue';


import Vuex from 'vuex';

//调用vuex插件
Vue.use(Vuex);

import menu from './modules/menu';
import role from './modules/role';
import user from './modules/user';
import cate from './modules/cate';
import specs from './modules/specs';
import goods from './modules/goods';
import member from './modules/member';
import banner from './modules/banner';
import seck from './modules/seck';

//导出实例化。
export default new Vuex.Store({
    state:{
        userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):null
    },
    getters:{
        getUserInfo(state){
            return state.userInfo;
        }
    },
    mutations:{
        CHANGE_USER(state,payload){
            state.userInfo=payload;
            if(payload){
                sessionStorage.setItem("userInfo",JSON.stringify(payload));
            }else{
                sessionStorage.removeItem("userInfo");
            }
        },
    },
    actions:{
        changeUserInfoActions({commit},payload){
            commit('CHANGE_USER',payload);
        }
    },
    modules:{
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        member,
        banner,
        seck,
    }
});