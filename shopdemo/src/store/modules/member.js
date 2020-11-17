import {getMemberList} from '../../util/axios';

const state={
    memberList:[],
}
const getters={
    getMemberList(){
        return state.memberList;
    }
}
const mutations={
    REQ_MEMBER(state,payload){
        state.memberList=payload;
    }
}
const actions={
    getMemberListActions({commit}){
        getMemberList()
        .then(res=>{
            // console.log(res,'数据成功');
            if(res.data.code==200){
                commit("REQ_MEMBER",res.data.list);
            }
        })
    }
}

export default {
     state,
     getters,
     mutations,
     actions,
     namespaced:true,//命名空间
}