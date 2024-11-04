
import { useLaunch } from '@tarojs/taro'
import './app.scss'

// 这里引入
import { Provider } from 'react-redux'
import store from './store'
import { Login } from './network'



function App({ children }) {

  useLaunch(() => {
    Login().then((userinfo) => {
      if (userinfo) {
        userinfo.nickName = userinfo.nickName || '微信用户';
      }

      store.dispatch({
        type: "addUser", val: userinfo || { 'nickName': "张奎" }
      });
    });
  })

  // children 是将要会渲染的页面
  return <Provider store={store}>
    {children}
  </Provider>
}

export default App
