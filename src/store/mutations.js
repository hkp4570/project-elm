
export default {
    get_userinfo(state,info){
        console.log(state, 'state');
        console.log(info, 'info');
        if(!info.message){
            state.userInfo = {...info};
        }else{
            state.userInfo = null;
        }
    }
}