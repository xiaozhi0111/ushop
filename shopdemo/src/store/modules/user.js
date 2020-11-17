import {getUserList,getUserCount} from '../../util/axios';


const state={
    userList:[],
    size: 2,
    page:1,
    total:0,
}

const getters={
    getUserList(){
        return state.userList;
    },
    getUserCount(){
        return state.total;
    },
    getUserSize(){
        return state.size;
    }
}
const mutations={
    //修改userList值。
    REQ_USERLIST(state,payload){
        state.userList=payload;
    },
    //修改count值
    REQ_USERCOUNT(state,payload){
        state.total=payload;
    },
    //切换页码
    REQ_PAGE(state,payload){
        state.page=payload;
    }
}

const actions={
    //获取数据列表的方法。
    getUserListActions(context){
        //调取接口。
        getUserList({
            size:context.state.size,
            page:context.state.page,
        })
        .then(res=>{
            // console.log(res,'响应');
            if(res.data.code==200){
                context.commit('REQ_USERLIST',res.data.list);
            }
        }).catch(err=>{
            console.log(err,'响应错误');
        });
    },
    //获取总数的方法。
    getUserCountActions({commit}){
        getUserCount()
        .then(res=>{
            // console.log(res,'响应');
            if(res.data.code==200){
                commit('REQ_USERCOUNT',res.data.list[0].total)
            }
        });
    },
    //封装一个切换页码改变数据的方法。
    getUserPageActions(context,payload){
        console.log(context,payload);
        //调取行动，修改页码数。
        context.commit("REQ_PAGE",payload);
        //重新调取行动，获取页面渲染数据，
        context.dispatch('getUserListActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}