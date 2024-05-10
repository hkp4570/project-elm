
export default {
    get_userinfo(state,info){
        if(!info.message){
            state.userInfo = {...info};
        }else{
            state.userInfo = null;
        }
    },
}