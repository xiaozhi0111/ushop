
import {getRoleList} from '../../util/axios';

const state={
    roleList:[]
}

const getters={
    getRoleList(state){
        return state.roleList
    }
}

const mutations={
    REQ_ROLELIST(state,payload){
        state.roleList=payload;
    }
}

const actions={
    getRoleListActions({commit}){
        getRoleList()
        .then(res=>{
            // console.log(res,'响应');
            if(res.data.code==200){
                commit('REQ_ROLELIST',res.data.list);
            }
        })
        .catch(err=>{
            console.log(err,'错误响应');
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}