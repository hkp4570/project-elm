import {getUser, getAddressList} from "@/service/getData";

export default {
    async getUserInfo(context) {
        const user = await getUser();
        context.commit('get_userinfo', user);
    },
    async saveAddress({commit, state}) {
        if (state.removeAddress.length > 0) return;
        const address = await getAddressList(state.userInfo.user_id);
        commit('save_removeList', address);
    },
}