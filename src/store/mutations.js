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
    reset_name(state, username) {
        state.userInfo = Object.assign({}, state.userInfo, {username});
    },
    // 新增的地址 是可以移除的
    add_removeList(state, addressObj) {
        state.removeAddress = [addressObj, ...state.removeAddress];
    },
    save_removeList(state, addressList) {
        state.removeAddress = addressList;
    },
    setState(state, payload) {
        const keys = Object.keys(payload);
        keys.forEach(key => {
            state[key] = payload[key];
        });
    },
    // 加入购物车
    add_cart(state, {
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock
    }) {
        let cart = state.cartList;
        let shop = cart[shopid] = (cart[shopid] || {});
        let category = shop[category_id] = (shop[category_id] || {});
        let item = category[item_id] = (category[item_id] || {});
        if (item[food_id]) {
            item[food_id]['num']++;
        } else {
            item[food_id] = {
                "num": 1,
                "id": food_id,
                "name": name,
                "price": price,
                "specs": specs,
                "packing_fee": packing_fee,
                "sku_id": sku_id,
                "stock": stock
            };
        }
        state.cartList = {...cart};
        //存入localStorage
        setStore('buyCart', state.cartList);
    },
    // 移出购物车
    reduce_cart(state, {
        shopid,
        category_id,
        item_id,
        food_id,
    }) {
        let cart = state.cartList;
        let shop = (cart[shopid] || {});
        let category = (shop[category_id] || {});
        let item = (category[item_id] || {});
        if (item && item[food_id]) {
            if (item[food_id]['num'] > 0) {
                item[food_id]['num']--;
                state.cartList = {...cart};
                //存入localStorage
                setStore('buyCart', state.cartList);
            } else {
                //商品数量为0，则清空当前商品的信息
                item[food_id] = null;
            }
        }
    },
    // 清空购物车信息
    clear_cart(state, shopid){
        state.cartList[shopid] = null;
        state.cartList = {...state.cartList};
        setStore('buyCart', state.cartList);
    }
}
