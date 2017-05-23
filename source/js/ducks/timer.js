const TIMER_START = 'timer/START'
const TIMER_TICK = 'timer/TICK'

export const Tick = () => ({type: TIMER_TICK})
export const Start = () => ({type: TIMER_START})

const INITIAL_STATE = {
  start: null,
  ticks: 0
}

export default function timerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TIMER_START:
      return {
        ...state,
        start: new Date()
      }
    case TIMER_TICK:
      return {
        ...state,
        ticks: state.ticks + 1
      }
    default:
      return state
  }
}
