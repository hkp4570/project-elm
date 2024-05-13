import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
    userInfo: null, //用户信息
    login: false, // 是否登录
    geohash: '31.22299,121.36025', // 地址geohash
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
})