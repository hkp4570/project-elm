import fetch from '../utils/fetch';
import {getStore} from '../utils/index';
import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";

/**
 * 获取首页默认地址
 * @returns {Promise<unknown>|*}
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
})

/**
 * 获取热门城市列表
 * @returns {Promise<unknown>|*}
 */
export const hotCity = () => fetch('/v1/cities', {
  type: 'hot'
})

/**
 * 获取所有城市列表
 * @returns {Promise<unknown>|*}
 */
export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
})

/**
 * 获取当前所在城市信息
 * @param number
 * @returns {Promise<unknown>|*}
 */
export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 搜索城市中的地址
 * @param cityid
 * @param value
 * @returns {Promise<unknown>|*}
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
});

/**
 * 获取msite页面地址信息
 * @param geohash
 * @returns {Promise<unknown>|*}
 */
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 * @param geohash
 * @returns {Promise<unknown>|*}
 */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
});

/**
 * 获取用户信息
 * @returns {Promise<unknown>|*}
 */
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');

/**
 * 用户名密码登录
 * @param username
 * @param password
 * @param captcha_code
 * @returns {Promise<unknown>|*}
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
  username,
  password,
  captcha_code
}, 'POST')
// export const accountLogin = (username, password, captcha_code) => new Promise(resolve => {
//     setTimeout(() => {
//         resolve({
//             "username": "adminuser",
//             "user_id": 79421,
//             "id": 79421,
//             "city": "北京",
//             "registe_time": "2024-04-29 17:34",
//             "column_desc": {
//                 "gift_mall_desc": "0元好物在这里",
//                 "game_link": "https://gamecenter.faas.ele.me",
//                 "game_is_show": 1,
//                 "game_image_hash": "05f108ca4e0c543488799f0c7c708cb1jpeg",
//                 "game_desc": "玩游戏领红包"
//             },
//             "point": 0,
//             "mobile": "",
//             "is_mobile_valid": true,
//             "is_email_valid": false,
//             "is_active": 1,
//             "gift_amount": 3,
//             "email": "",
//             "delivery_card_expire_days": 0,
//             "current_invoice_id": 0,
//             "current_address_id": 0,
//             "brand_member_new": 0,
//             "balance": 0,
//             "avatar": "default.jpg",
//             "__v": 0
//         })
//     }, 100)
// })

/**
 * 退出登录
 * @returns {Promise<unknown>|*}
 */
export const signout = () => fetch('/v2/signout');

/**
 * 改密码
 */
export const changePassword = (username, oldPassWord, newPassword, confirmPassword, captcha_code) => fetch('/v2/changepassword', {
  username,
  oldPassWord,
  newPassword,
  confirmPassword,
  captcha_code
}, 'POST');

/**
 * 添加地址
 * @param userId
 * @param address
 * @param address_detail
 * @param geohash
 * @param name
 * @param phone
 * @param phone_bk
 * @param poi_type
 * @param sex
 * @param tag
 * @param tag_type
 * @returns {Promise<unknown>|*}
 */
export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
  address,
  address_detail,
  geohash,
  name,
  phone,
  phone_bk,
  poi_type,
  sex,
  tag,
  tag_type,
}, 'POST');

/**
 * 搜索周边地址
 * @param keyword
 * @returns {Promise<unknown>|*}
 */
export const searchNearby = keyword => fetch('/v1/pois', {
  type: 'nearby',
  keyword
});

/**
 * 删除地址
 * @param userid
 * @param addressid
 * @returns {Promise<unknown>|*}
 */
export const deleteAddress = (userid, addressid) => fetch('/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')

/**
 * 获取地址列表
 * @param user_id
 * @returns {Promise<unknown>|*}
 */
export const getAddressList = (user_id) => fetch('/v1/users/' + user_id + '/addresses')

/**
 * 获取红包
 * @param id
 * @returns {Promise<unknown>|*}
 */
export const getHongbaoNum = id => fetch('/v2/users/' + id + '/hongbaos?limit=20&offset=0');

/**
 * 获取过期红包
 * @param id
 * @returns {Promise<unknown>|*}
 */
export const getExpired = id => fetch('/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');

/**
 * 兑换红包
 * @param id
 * @param exchange_code
 * @param captcha_code
 * @returns {Promise<unknown>|*}
 */
export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v2/users/' + id + '/hongbao/exchange', {
  exchange_code,
  captcha_code,
}, 'POST');

/**
 * 获取商铺列表
 * @param latitude
 * @param longitude
 * @param offset
 * @param restaurant_category_id
 * @param restaurant_category_ids
 * @param order_by
 * @param delivery_mode
 * @param support_ids
 * @returns {Promise<unknown>|*}
 */
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants', data);
};

/**
 * search页的搜索结果
 * @param geohash
 * @param keyword
 * @returns {Promise<unknown>|*}
 */
// export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
//     'extras[]': 'restaurant_activity',
//     geohash,
//     keyword,
//     type: 'search'
// });
const data = [
  {
    "name": "火锅店3987",
    "address": "江苏省南京市秦淮区天妃巷123号",
    "id": 3961,
    "latitude": 32.039953,
    "longitude": 118.776888,
    "location": [
      118.776888,
      32.039953
    ],
    "phone": "13090897828",
    "category": "果蔬生鲜/海鲜水产",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5c53fd760719752209406bb1"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5c53fd760719752209406bb0"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5c53fd760719752209406baf"
      }
    ],
    "status": 0,
    "recent_order_num": 540,
    "rating_count": 843,
    "rating": 4.2,
    "promotion_info": "3",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "06:30/09:15"
    ],
    "license": {
      "catering_service_license_image": "",
      "business_license_image": ""
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "168a816080c26672.png",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "1009.9公里",
    "order_lead_time": "10小时52分钟",
    "description": "3",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5c53fd760719752209406bb2"
      }
    ],
    "__v": 0
  },
  {
    "name": "成都耙耳朵火锅店",
    "address": "四川省成都市金牛区交通巷36",
    "id": 3986,
    "latitude": 30.67785,
    "longitude": 104.05093,
    "location": [
      104.05093,
      30.67785
    ],
    "phone": "69880987",
    "category": "特色菜系/火锅烤鱼",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5c64cca1f7894838ec07aee7"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5c64cca1f7894838ec07aee6"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5c64cca1f7894838ec07aee5"
      }
    ],
    "status": 0,
    "recent_order_num": 22,
    "rating_count": 222,
    "rating": 4.1,
    "promotion_info": "做有温度的餐饮",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "05:30/23:30"
    ],
    "license": {
      "catering_service_license_image": "168e9bec7b926835.jpg",
      "business_license_image": "168e9beb44926834.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "168e9be7ee326833.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "1786.0公里",
    "order_lead_time": "18小时57分钟",
    "description": "成都最有味道的火锅店，最受消费者欢迎的火锅店",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5c64cca1f7894838ec07aeeb"
      },
      {
        "icon_name": "特",
        "name": "优惠大酬宾",
        "description": "优惠多多，进店了解",
        "icon_color": "EDC123",
        "id": 2,
        "_id": "5c64cca1f7894838ec07aeea"
      },
      {
        "icon_name": "新",
        "name": "新用户立减",
        "description": "新用户送50元代金券",
        "icon_color": "70bc46",
        "id": 3,
        "_id": "5c64cca1f7894838ec07aee9"
      },
      {
        "icon_name": "领",
        "name": "进店领券",
        "description": "进店就送100元抵扣券",
        "icon_color": "E3EE0D",
        "id": 4,
        "_id": "5c64cca1f7894838ec07aee8"
      }
    ],
    "__v": 0
  },
  {
    "name": "火锅",
    "address": "地铁2号线",
    "id": 4064,
    "latitude": 38.865432,
    "longitude": 121.531981,
    "location": [
      116.427106,
      39.904961
    ],
    "phone": "1899899999",
    "category": "快餐便当/简餐",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5c712a57f7894838ec07e53f"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5c712a57f7894838ec07e53e"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5c712a57f7894838ec07e53d"
      }
    ],
    "status": 1,
    "recent_order_num": 256,
    "rating_count": 161,
    "rating": 4.9,
    "promotion_info": "身份",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "8:30/20:30"
    ],
    "license": {
      "catering_service_license_image": "",
      "business_license_image": ""
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "1691a0d668427505.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "827.2公里",
    "order_lead_time": "8小时57分钟",
    "description": "身份",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5c712a57f7894838ec07e540"
      }
    ],
    "__v": 0
  },
  {
    "name": "郑晓强火锅城",
    "address": "上海市浦东新区金科路2727号",
    "id": 4572,
    "latitude": 31.20906,
    "longitude": 121.60098,
    "location": [
      121.60098,
      31.20906
    ],
    "phone": "862120836740",
    "category": "特色菜系/火锅烤鱼",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5c9b052ce59de0247530a976"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5c9b052ce59de0247530a975"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5c9b052ce59de0247530a974"
      }
    ],
    "status": 0,
    "recent_order_num": 709,
    "rating_count": 771,
    "rating": 5,
    "promotion_info": "难以抵挡的辣旋风",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "09:00/22:00"
    ],
    "license": {
      "catering_service_license_image": "169bd8c49d029849.jpg",
      "business_license_image": "169bd8c054c29848.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "169bd8be8f229847.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "1190.5公里",
    "order_lead_time": "12小时45分钟",
    "description": "川菜，火锅",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5c9b052ce59de0247530a977"
      }
    ],
    "__v": 0
  },
  {
    "name": "潮汕牛肉肉火锅",
    "address": "广东省广州市越秀区横枝岗路62号",
    "id": 10474,
    "latitude": 23.147556,
    "longitude": 113.288926,
    "location": [
      113.288926,
      23.147556
    ],
    "phone": "13555555555",
    "category": "特色菜系/粤菜",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5da6cecf56d4e23f985e466a"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5da6cecf56d4e23f985e4669"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5da6cecf56d4e23f985e4668"
      }
    ],
    "status": 1,
    "recent_order_num": 205,
    "rating_count": 358,
    "rating": 4.4,
    "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "11:45/21:45"
    ],
    "license": {
      "catering_service_license_image": "16dd396da2756418.jpg",
      "business_license_image": "16dd396bf2856417.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "16dd396adc556416.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 15,
    "float_delivery_fee": 5,
    "distance": "2111.6公里",
    "order_lead_time": "22小时20分钟",
    "description": "",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5da6cecf56d4e23f985e466b"
      }
    ],
    "__v": 0
  },
  {
    "name": "潮汕牛肉火锅",
    "address": "广东省广州市越秀区环市西路159号",
    "id": 10479,
    "latitude": 23.149135,
    "longitude": 113.25834,
    "location": [
      113.25834,
      23.149135
    ],
    "phone": "13555555555",
    "category": "特色菜系/粤菜",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5da6d92e56d4e23f985e4755"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5da6d92e56d4e23f985e4754"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5da6d92e56d4e23f985e4753"
      }
    ],
    "status": 0,
    "recent_order_num": 853,
    "rating_count": 348,
    "rating": 4,
    "promotion_info": "阿斯达四大",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "8:30/20:30"
    ],
    "license": {
      "catering_service_license_image": "16dd3c06a8356428.png",
      "business_license_image": "16dd3c03fa056427.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "16dd3c03e8f56426.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "2109.8公里",
    "order_lead_time": "22小时19分钟",
    "description": "阿斯达四大",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5da6d92e56d4e23f985e4756"
      }
    ],
    "__v": 0
  },
  {
    "name": "羊蝎子火锅",
    "address": "河南省周口市沈丘县兆丰大道与淮河路交叉口东侧",
    "id": 13337,
    "latitude": 33.403003,
    "longitude": 115.095221,
    "location": [
      115.095221,
      33.403003
    ],
    "phone": "19438192978",
    "category": "快餐便当/简餐",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "5e7c2f03dd5b8d23f149475c"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "5e7c2f03dd5b8d23f149475b"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "5e7c2f03dd5b8d23f149475a"
      }
    ],
    "status": 1,
    "recent_order_num": 459,
    "rating_count": 996,
    "rating": 4.6,
    "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "8:30/20:30"
    ],
    "license": {
      "catering_service_license_image": "",
      "business_license_image": ""
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "1711517872e65402.png",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "796.9公里",
    "order_lead_time": "8小时39分钟",
    "description": "羊蝎子火锅给您带来不一样的体验",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "5e7c2f03dd5b8d23f149475d"
      }
    ],
    "__v": 0
  },
  {
    "name": "火锅",
    "address": "广东省深圳市龙岗区布吉街道办吉华路94号",
    "id": 16706,
    "latitude": 22.602148,
    "longitude": 114.120102,
    "location": [
      114.120102,
      22.602148
    ],
    "phone": "11111111111",
    "category": "快餐便当/简餐",
    "supports": [],
    "status": 0,
    "recent_order_num": 778,
    "rating_count": 454,
    "rating": 4.1,
    "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "8:30/20:30"
    ],
    "license": {
      "catering_service_license_image": "",
      "business_license_image": ""
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "178ef6652c990683.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "2140.0公里",
    "order_lead_time": "22小时38分钟",
    "description": "1111",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "607e41d7a372837a040ef680"
      }
    ],
    "__v": 0
  },
  {
    "name": "刘一手火锅",
    "address": "北京市朝阳区金盏北路",
    "id": 16951,
    "latitude": 40.008034,
    "longitude": 116.57626,
    "location": [
      116.57626,
      40.008034
    ],
    "phone": "12345678911",
    "category": "特色菜系/川湘菜",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "60a0eac0c552d60d6fd637e4"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "60a0eac0c552d60d6fd637e3"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "60a0eac0c552d60d6fd637e2"
      }
    ],
    "status": 0,
    "recent_order_num": 133,
    "rating_count": 572,
    "rating": 4.5,
    "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "05:30/23:30"
    ],
    "license": {
      "catering_service_license_image": "",
      "business_license_image": ""
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "17974951b5392136.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 100,
    "float_delivery_fee": 5,
    "distance": "12.2公里",
    "order_lead_time": "28分钟",
    "description": "",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [],
    "__v": 0
  },
  {
    "name": "蔡蔡小火锅",
    "address": "湖北省武汉市洪山区虎泉街光谷广场地铁站E出口向东60米",
    "id": 18571,
    "latitude": 30.505998,
    "longitude": 114.399265,
    "location": [
      114.399265,
      30.505998
    ],
    "phone": "15927589453",
    "category": "特色菜系/火锅烤鱼",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "619a1bb810cf8444c922125f"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "619a1bb810cf8444c922125e"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "619a1bb810cf8444c922125d"
      }
    ],
    "status": 0,
    "recent_order_num": 710,
    "rating_count": 223,
    "rating": 4.4,
    "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "8:30/20:30"
    ],
    "license": {
      "catering_service_license_image": "17d41fc4501101996.jpeg",
      "business_license_image": "17d41fc47eb101995.jpeg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "17d41fc2d99101994.jpeg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "1162.9公里",
    "order_lead_time": "12小时27分钟",
    "description": "",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "619a1bb810cf8444c9221260"
      }
    ],
    "__v": 0
  },
  {
    "name": "螺蛳粉火锅",
    "address": "浙江省杭州市拱墅区上塘路158号",
    "id": 21225,
    "latitude": 30.285175,
    "longitude": 120.168528,
    "location": [
      120.168528,
      30.285175
    ],
    "phone": "19899998989",
    "category": "快餐便当/包子粥店",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "63631993741acb6fe7237172"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "63631993741acb6fe7237171"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "63631993741acb6fe7237170"
      }
    ],
    "status": 1,
    "recent_order_num": 520,
    "rating_count": 911,
    "rating": 4.6,
    "promotion_info": "飞翔的体验",
    "piecewise_agent_fee": {
      "tips": "配送费约¥0"
    },
    "opening_hours": [
      "11:30/17:15"
    ],
    "license": {
      "catering_service_license_image": "1843b18bc29110966.jpg",
      "business_license_image": "1843b1897ea110965.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "1843b1866a1110964.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 0,
    "distance": "1240.5公里",
    "order_lead_time": "13小时16分钟",
    "description": "螺狮粉榴莲火锅",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "63631993741acb6fe7237174"
      },
      {
        "icon_name": "特",
        "name": "优惠大酬宾",
        "description": "来消费",
        "icon_color": "EDC123",
        "id": 2,
        "_id": "63631993741acb6fe7237173"
      }
    ],
    "__v": 0
  },
  {
    "name": "榴莲火锅",
    "address": "浙江省杭州市西湖区龙井路1号",
    "id": 21226,
    "latitude": 30.224781,
    "longitude": 120.12438,
    "location": [
      120.12438,
      30.224781
    ],
    "phone": "18778789878",
    "category": "快餐便当/简餐",
    "supports": [
      {
        "description": "已加入“外卖保”计划，食品安全有保障",
        "icon_color": "999999",
        "icon_name": "保",
        "id": 7,
        "name": "外卖保",
        "_id": "63631df8741acb6fe72371a0"
      },
      {
        "description": "准时必达，超时秒赔",
        "icon_color": "57A9FF",
        "icon_name": "准",
        "id": 9,
        "name": "准时达",
        "_id": "63631df8741acb6fe723719f"
      },
      {
        "description": "该商家支持开发票，请在下单时填写好发票抬头",
        "icon_color": "999999",
        "icon_name": "票",
        "id": 4,
        "name": "开发票",
        "_id": "63631df8741acb6fe723719e"
      }
    ],
    "status": 0,
    "recent_order_num": 232,
    "rating_count": 491,
    "rating": 4.8,
    "promotion_info": "飞翔",
    "piecewise_agent_fee": {
      "tips": "配送费约¥5"
    },
    "opening_hours": [
      "12:00/16:45"
    ],
    "license": {
      "catering_service_license_image": "1843b2c51e3110972.jpg",
      "business_license_image": "1843b2c251b110971.jpg"
    },
    "is_new": true,
    "is_premium": true,
    "image_path": "1843b2bf84f110970.jpg",
    "identification": {
      "registered_number": "",
      "registered_address": "",
      "operation_period": "",
      "licenses_scope": "",
      "licenses_number": "",
      "licenses_date": "",
      "legal_person": "",
      "identificate_date": null,
      "identificate_agency": "",
      "company_name": ""
    },
    "float_minimum_order_amount": 20,
    "float_delivery_fee": 5,
    "distance": "1247.7公里",
    "order_lead_time": "13小时20分钟",
    "description": "吃不死人",
    "delivery_mode": {
      "color": "57A9FF",
      "id": 1,
      "is_solid": true,
      "text": "蜂鸟专送"
    },
    "activities": [
      {
        "icon_name": "减",
        "name": "满减优惠",
        "description": "满30减5，满60减8",
        "icon_color": "f07373",
        "id": 1,
        "_id": "63631df8741acb6fe72371a4"
      },
      {
        "icon_name": "特",
        "name": "优惠大酬宾",
        "description": "11",
        "icon_color": "EDC123",
        "id": 2,
        "_id": "63631df8741acb6fe72371a3"
      },
      {
        "icon_name": "新",
        "name": "新用户立减",
        "description": "33",
        "icon_color": "70bc46",
        "id": 3,
        "_id": "63631df8741acb6fe72371a2"
      },
      {
        "icon_name": "领",
        "name": "进店领券",
        "description": "55",
        "icon_color": "E3EE0D",
        "id": 4,
        "_id": "63631df8741acb6fe72371a1"
      }
    ],
    "__v": 0
  }
]
export const searchRestaurant = (geohash, keyword) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data);
  }, 1000)
});

/**
 * 获取food页面的商品分类
 * @returns {Promise<unknown>|*}
 */
export const foodCategory = () => fetch('/shopping/v2/restaurant/category');
/**
 * 获取food页面的配送方式
 * @returns {Promise<unknown>|*}
 */
export const foodDelivery = () => fetch('/shopping/v1/restaurants/delivery_modes');

/**
 * 获取food页面的商家属性活动列表
 * @returns {Promise<unknown>|*}
 */
export const foodActivity = () => fetch('/shopping/v1/restaurants/activity_attributes');

/**
 * 获取food页面的商家信息
 * @param shopid
 * @param latitude
 * @param longitude
 * @returns {Promise<unknown>|*}
 */
export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
  latitude,
  longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取food页面的商家菜单列表
 * @param restaurant_id
 * @returns {Promise<unknown>|*}
 */
export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
  restaurant_id
});

/**
 * 获取商铺评论列表
 * @param shopid
 * @param offset
 * @param tag_name
 * @returns {Promise<unknown>|*}
 */
export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
  has_content: true,
  offset,
  limit: 10,
  tag_name
});

/**
 * 获取商铺评论分数
 * @param shopid
 * @returns {Promise<unknown>|*}
 */
export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');

/**
 * 获取评论分类列表
 * @param shopid
 * @returns {Promise<unknown>|*}
 */
export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');

/**
 * 获取订单列表
 * @param user_id
 * @param offset
 * @returns {Promise<unknown>|*}
 */
export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
  limit: 10,
  offset,
});

/**
 * 检查订单
 * @param geohash
 * @param entities
 * @param shopid
 * @return {Promise<unknown>|*}
 */
export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
  come_from: "web",
  geohash,
  entities,
  restaurant_id: shopid,
}, 'POST');

/**
 * 下单时的备注列表
 * @param id
 * @param sig
 * @return {Promise<unknown>|*}
 */
export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
  sig
});

