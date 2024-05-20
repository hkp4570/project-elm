import {setStore} from "@/utils";

export default {
    get_userinfo(state, info) {
        if (state.userInfo && state.userInfo.username === info.username) {
            return;
        }
        if (!info.message) {
            state.userInfo = info;
            state.login = true;
        } else {
            state.userInfo = null;
            state.login = false;
        }
    },
    record_userinfo(state, info) {
        state.userInfo = info;
        state.login = true;
        setStore('user_id', info.user_id);
    },
    out_login(state) {
        state.userInfo = {};
        state.login = false;
    },
    setState(state, payload) {
        const keys = Object.keys(payload);
        keys.forEach(key => {
            state[key] = payload[key];
        });
    }
}