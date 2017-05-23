import { combineReducers } from 'redux'
import processes from './processes'
import timer from './timer'

const rootReducer = combineReducers({
  processes,
  timer
})

export default rootReducer
