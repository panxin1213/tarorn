import Taro from "@tarojs/taro";

export const env = 't1'

// export let baseURL = 'http://yhsj.27.chinajm.cn:8090'

// export const cdnUrl = "http://yhsj.27.chinajm.cn:8090/static/images/weapp/";

// export let baseURL = 'http://yhsj.27.chinajm.cn'

// export const cdnUrl = "http://yhsj.27.chinajm.cn/static/images/weapp/";



export let baseURL = 'http://gkapi.icheguo.com:8090'

export const cdnUrl = "https://cdn-01.xue265.com/static/images/weapp/";

/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const get = (url, data, headers) => request('GET', url, data, headers);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const post = (url, data, headers) => request('POST', url, data, headers);

let errcount = 0;
/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
export function request(method, url, data, header = {}) {
    const olddata = {
        ...data
    };
    const oldurl = url;
    url = `${baseURL}${url}`
    // header = Object.assign(header, {
    //   'Cookie': Taro.getStorageSync('cookie')
    // })
    return new Promise((resolve, reject) => {
        const response = {};
        const cookie = Taro.getStorageSync('cookie')
        if (cookie) {
            header['Cookie'] = cookie;
        }
        Taro.request({
            url,
            method,
            data,
            header,
            credentials: true,
            success: (res) => {
                const data = res.data
                if (data.code === 0) {
                    Taro.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
                const {
                    cookies
                } = res;
                res.data.cookies = cookies;
                response.success = res.data;
            },
            fail: (error) => response.fail = error,
            complete() {
                if (response.success) {
                    if (response.success.code === 10001) { //登录过期
                        errcount++;
                        if (errcount >= 4) {
                            reject('登录错误，请检查服务端内容');
                            Taro.redirectTo({
                                url: '/pages/common/error',
                            })
                            reject('登录错误，请检查服务端内容');
                            return;
                        }
                        Login().then(res => {
                            request(method, oldurl, olddata, header).then(response => {
                                resolve(response);
                            })
                        });
                    } else if (response.success.code === 10002) { //未授权手机号码
                        Taro.navigateTo({
                            url: '/pages/auth/authphone',
                        })
                        reject('登录错误，请检查服务端内容');
                        return;
                    } else {
                        resolve(response.success)
                    }
                } else {
                    reject(response.fail)
                }
            },
        });

    });
}

/**
 * 登录接口
 * @param {*} code 
 */
export function Login() {
    return new Promise((resolve, reject) => {
        try {
            // 登录
            Taro?.login?.({
                success: res => {
                    if (res.code) {
                        get("/plugin/wxapp/login/index", {
                            code: res.code
                        }).then(res => {
                            const {
                                cookies,
                                data: {
                                    userinfo
                                }
                            } = res;
                            if (cookies && cookies.length) {
                                Taro.setStorageSync("cookie", cookies.join(';'));
                            }

                            resolve(userinfo);
                            //Taro.setStorageSync('userinfo', userinfo);
                        });
                    } else {
                        reject("login error");
                    }
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                },
                fail: res => {
                    console.log("fail", res);
                },
                complete: res => {
                    //console.log("complete", res);
                }
            })
        } catch (e) {
            console.log('e', e);
        }
    });
}