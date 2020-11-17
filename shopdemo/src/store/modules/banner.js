import {getBannerList} from '../../util/axios';

const state={
    bannerList:[],
}

const getters={
    getBannerList(){
        return state.bannerList;
    }
}

const mutations={
    REQ_BANNERLIST(state,payload){
        state.bannerList=payload;
    }
}

const actions={
    getBannerListActions({commit}){
        getBannerList()
        .then(res=>{
            // console.log(res,'成功数据');
            commit('REQ_BANNERLIST',res.data.list);
        })
        .catch(err=>{
            console.log(err,'获取错误');
        });
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true,//命名空间
}