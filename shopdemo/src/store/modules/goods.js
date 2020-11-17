import { getGoodsList, getGoodsCount } from '../../util/axios';

const state = {
    goodsList: [],
    size: 2,
    page: 1,
    total: 0,
}
const getters = {
    getGoodsList() {
        return state.goodsList;
    },
    getGoodsCount() {
        return state.total;
    },
    getGoodsSize() {
        return state.size;
    }
}
const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload;
    },
    REQ_COUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload;
    }
}
const actions = {
    getGoodsListActions(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code == 200) {
                    let data=res.data.list?res.data.list:[];
                    context.commit("REQ_GOODSLIST", data);
                    //判断，看是不是第一页，如果不是并且你当前的这个列等于0；
                    if (context.state.page != 1 && data.length == 0) {
                        context.dispatch('getGoodsPageActions', context.state.page - 1);
                        context.dispatch('getGoodsCountActions');
                        context.dispatch('getGoodsListActions');
                        return;
                    }
                }
            })
    },
    getGoodsCountActions({ commit }) {
        getGoodsCount()
            .then(res => {
                // console.log(res,'总数');
                if (res.data.code == 200) {
                    commit('REQ_COUNT', res.data.list[0].total);
                }
            });
    },
    getGoodsPageActions(context, payload) {
        context.commit('REQ_PAGE', payload);
        context.dispatch('getGoodsListActions');
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,//命名空间
}