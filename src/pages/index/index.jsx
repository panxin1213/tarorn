import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

import { useSelector } from 'react-redux'


export default function Index(props) {
  // 正常使用
  //const { user } = { user: { nickName: '123' } }
  const nickName = useSelector((state) => (state?.user?.nickName || '微信用户'));


  useLoad(() => {
    console.log("Taro.ENV_TYPE", Taro.getEnv());
  })

  const marginStyle = { margin: 8 }

  return (
    <View>
      {nickName}
      <Button type="primary" style={marginStyle}>
        Primary
      </Button>
    </View>
  )
}
