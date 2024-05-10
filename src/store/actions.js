import {getUser} from "@/service/getData";

export default {
    async getUserInfo(context) {
        const user = await getUser();
        context.commit('get_userinfo', user);
    }
}