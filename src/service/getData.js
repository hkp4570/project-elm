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