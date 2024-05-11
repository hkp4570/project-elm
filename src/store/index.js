import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
    userInfo: null, //用户信息
    login: false, // 是否登录
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
})