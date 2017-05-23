import { combineReducers } from 'redux'
import processes from './processes'
import timer from './timer'
import strategy from './strategy'

const rootReducer = combineReducers({
  processes,
  timer,
  strategy
})

export default rootReducer
