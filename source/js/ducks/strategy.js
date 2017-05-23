import { Purge, Init } from './processes'

const SELECT_STRATEGY = 'strategy/SELECT_STRATEGY'

export function Select (strategy) {
  return (dispatch) => {
    dispatch({type: SELECT_STRATEGY, strategy})
    dispatch(Purge())
    dispatch(Init())
  }
}

const INITIAL_STATE = {
  strategy: 'FCFS'
}

export default function strategyReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_STRATEGY:
      return {
        strategy: action.strategy
      }
    default:
      return state
  }
}
