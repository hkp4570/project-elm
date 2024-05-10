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