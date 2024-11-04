// action暂时没涉及，暂定any类型
// state 的数据类型上文有提及 = defaultState 是给state一个默认值
const reducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state || {
        user: { 'nickName': '微信用户' },
        bodyloading: false
    }));

    switch (action.type) {
        case 'addUser':
            newState.user = action.val
            break
        case 'setBodyLoading':
            newState.bodyloading = !!action.val
            break
        default:
            break
    }

    return newState
}
// 最后，只需要导出一下 reducer 即可正常使用
export default reducer