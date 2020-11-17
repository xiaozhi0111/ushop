import {getSpecsList,getSpecsCount} from '../../util/axios';


const state={
    specsList:[],
    size:2,
    page:1,
    total:0
}

const getters={
    getSpecsList(){
        return state.specsList;
    },
    getSpecsCount(){
        return state.total;
    },
    getSpecsSize(){
        return state.size;
    }
}

const mutations={
    REQ_SPECSLIST(state,payload){
        state.specsList=payload;
    },
    REQ_SPECSCOUNT(state,payload){
        state.total=payload;
    },
    REQ_PAGE(state,payload){
        state.page=payload;
    }
}

const actions={
    getSpecsListActions(context){
        getSpecsList({
            size:context.state.size,
            page:context.state.page
        })
        .then(res=>{
            // console.log(res,'响应成功');
            if(res.data.code==200){
                let data=res.data.list?res.data.list:[];
                context.commit('REQ_SPECSLIST',data);
                //判断，看是不是第一页，如果不是并且你当前的这个列等于0；
                if(context.state.page!=1&&data.length==0){
                    context.dispatch('getSpecsPageActions',context.state.page-1);
                    context.dispatch('getSpecsListActions');
                    return ;
                }
            }
        })
    },
    getSpecsCountActions({commit}){
        getSpecsCount()
        .then(res=>{
            // console.log(res,'获取的总数。');
            if(res.data.code==200){
                commit("REQ_SPECSCOUNT",res.data.list[0].total);
            }
        })
    },
    getSpecsPageActions(context,payload){
        context.commit('REQ_PAGE',payload);
        context.dispatch('getSpecsListActions');
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true,
}