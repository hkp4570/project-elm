import {setStore, getStore} from "@/utils";

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
  record_shopDetail(state, detail) {
    state.shopDetail = detail;
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
  clear_cart(state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = {...state.cartList};
    setStore('buyCart', state.cartList);
  },
  // 网页初始化时从本地缓存获取购物车数据
  init_buyCard(state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
  save_shopId(state, shopId) {
    state.shopId = shopId;
  },
  // 下单后保存购物车id和购物车sig
  save_cart_id_sig(state, {cart_id, sig}) {
    state.cartId = cart_id;
    state.sig = sig;
  },
  // 下单时选择的收货地址
  choose_address(state, {address, index}) {
    state.chooseAddress = address;
    state.addressIndex = index;
  },
  // 选择搜索到的地址
  choose_search_address(state, place) {
    state.searchAddress = place;
  },
  confirm_address(state, newAddress) {
    state.newAddress.push(newAddress);
  },
  // 订单备注
  confirm_remark(state, {remarkText, inputText}) {
    state.remarkText = remarkText;
    state.inputText = inputText;
  },
  // 订单参数
  save_order_param(state, orderParam) {
    state.orderParam = orderParam;
  },
  // 下单成功保存返回值
  order_success(state, order) {
    state.cartPrice = null;
    state.orderMessage = order;
  },
  save_order(state, detail) {
    state.orderDetail = detail;
  }
}
