import {
    post,
    get
} from './index'

/**
 * 更新用户信息
 * @param {*} encrypted_data 
 * @param {*} iv 
 */
export function updateUserInfo(encrypted_data, iv) {
    return post("/plugin/wxapp/login/updateUserInfo", {
        encrypted_data,
        iv
    })
}


/**
 * 授权用户手机号码
 * @param {*} encrypted_data 
 * @param {*} iv 
 */
export function updatePhone(encrypted_data, iv) {
    return post("/plugin/wxapp/login/updateUserPhone", {
        encrypted_data,
        iv
    })
}
