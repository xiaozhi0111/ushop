import {getSeckList} from '../../util/axios';

const state={
    seckList:[],
}

const getters={
    getSeckList(){
        return state.seckList;
    }
}

const mutations={
    REQ_SECKLIST(state,payload){
        state.seckList=payload;
    }
}

const actions={
    getSeckListActions({commit}){
        getSeckList()
        .then(res=>{
            // console.log(res,'成功数据');
            if(res.data.code==200){
                commit('REQ_SECKLIST',res.data.list);
            }
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