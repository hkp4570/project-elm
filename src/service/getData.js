import fetch from '../utils/fetch';
import {getStore} from '../utils/index';

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
// export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
//     username,
//     password,
//     captcha_code
// }, 'POST')
export const accountLogin = (username, password, captcha_code) => new Promise(resolve => {
    setTimeout(() => {
        resolve({
            "username": "adminuser",
            "user_id": 79421,
            "id": 79421,
            "city": "北京",
            "registe_time": "2024-04-29 17:34",
            "column_desc": {
                "gift_mall_desc": "0元好物在这里",
                "game_link": "https://gamecenter.faas.ele.me",
                "game_is_show": 1,
                "game_image_hash": "05f108ca4e0c543488799f0c7c708cb1jpeg",
                "game_desc": "玩游戏领红包"
            },
            "point": 0,
            "mobile": "",
            "is_mobile_valid": true,
            "is_email_valid": false,
            "is_active": 1,
            "gift_amount": 3,
            "email": "",
            "delivery_card_expire_days": 0,
            "current_invoice_id": 0,
            "current_address_id": 0,
            "brand_member_new": 0,
            "balance": 0,
            "avatar": "default.jpg",
            "__v": 0
        })
    }, 100)
})