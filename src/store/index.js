import { legacy_createStore } from 'redux' 
import reducer from './reducer'

const store = legacy_createStore(reducer)
// reducer 是我们接下来的一步的内容

export default store