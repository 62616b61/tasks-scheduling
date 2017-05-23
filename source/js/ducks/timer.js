const TIMER_TICK = 'timer/TICK'

export function Tick () {
  return (dispatch) => {
    dispatch({type: TIMER_TICK})
  }
}

const INITIAL_STATE = {
  ticks: 0
}

export default function timerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TIMER_TICK:
      return {
        ticks: state.ticks + 1
      }
    default:
      return state
  }
}
