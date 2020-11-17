import { getCateList } from '../../util/axios';

const state = {
    cateList: [],
}

const getters = {
    getCateList() {
        return state.cateList;
    }
}

const mutations = {
    REQ_COTELIST(state, payload) {
        state.cateList = payload;
    }
}

const actions = {
    getCateListActions({ commit }) {
        getCateList({
            istree: true
        })
            .then(res => {
                // console.log(res,'成功响应');
                if (res.data.code == 200) {
                    commit("REQ_COTELIST", res.data.list);
                } else {
                    console.log('修改错误');
                }
            })
            .catch(err => {
                console.log(err, '错误响应');
            });
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,//命名空间
}