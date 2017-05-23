const CREATE_PROCESS = 'processes/CREATE_PROCESS'
const RESOLVE_PROCESS = 'processes/RESOLVE_PROCESS'
const ALLOCATE_CPUTIME = 'processes/ALLOCATE_CPUTIME'
const ADJUST_STRATEGY = 'processes/ADJUST_STRATEGY'

export function Init () {
  return (dispatch, getState) => {
    const currProcs = getState().processes.list.current

    if (!currProcs.length) {
      for (let i = 0; i < 2; i++) dispatch(createProcess())
    }
  }
}

export function Tick () {
  return (dispatch, getState) => {
    dispatch(generateNewTask())

    const strategy = 'FCFS'
    const currProcs = getState().processes.list.current

    if (!currProcs.length) return

    const ifResolved = x => x.cputime.required === x.cputime.done
    const resolvedProcess = currProcs.find(ifResolved)

    if (resolvedProcess) dispatch(resolveProcess(resolvedProcess.id))
    else {
      switch (strategy) {
        case 'RR':
          const doesExist = id => currProcs.find(x => x.id === id)
          const rrId = getState().processes.strategy.RR.id

          if (doesExist(rrId)) dispatch(allocateCPUTime(rrId))
          else dispatch(allocateCPUTime(currProcs[0].id))

          const index = currProcs.findIndex(x => x.id === rrId)
          if (currProcs.length > index + 1) {
            dispatch(adjustStrategy('RR', 'id', currProcs[index + 1].id))
          } else {
            dispatch(adjustStrategy('RR', 'id', currProcs[0].id))
          }
          break
        case 'FCFS':
          dispatch(allocateCPUTime(currProcs[0].id))
      }
    }
  }
}

function generateNewTask () {
  const thresholdToSpawn = 0.1
  const chance = Math.random()

  return (dispatch, getState) => {
    const numOfProcs = getState().processes.list.current.length
    if (chance <= thresholdToSpawn && numOfProcs < 20) {
      dispatch(createProcess())
    }
  }
}

export function createProcess () {
  return (dispatch, getState) => {
    const tick = getState().timer.ticks
    dispatch({type: CREATE_PROCESS, tick})
  }
}

export function resolveProcess (id) {
  return (dispatch, getState) => {
    const tick = getState().timer.ticks
    dispatch({type: RESOLVE_PROCESS, id, tick})
  }
}

export function allocateCPUTime (id) {
  return (dispatch, getState) => {
    const tick = getState().timer.ticks
    dispatch({type: ALLOCATE_CPUTIME, id, tick})
  }
}

const adjustStrategy = (strategy, key, value) => {
  return {
    type: ADJUST_STRATEGY,
    strategy,
    key,
    value
  }
}

const INITIAL_STATE = {
  list: {
    lastId: 0,
    current: [],
    resolved: []
  },
  strategy: {
    RR: {
      // is used to store an ID of last task to allocate cputime to
      id: 0
    }
  }
}

export default function processesReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_PROCESS:
      const cputime = Math.floor(Math.random() * 10) + 10

      return {
        ...state,
        list: {
          ...state.list,
          lastId: state.list.lastId + 1,
          current: [
            ...state.list.current,
            // push new process
            {
              id: state.list.lastId,
              timings: {
                arrival: action.tick,
                start: null,
                completion: null,
                waiting: 0
              },
              cputime: {
                required: cputime,
                done: 0
              }
            }
          ]
        }
      }
    case RESOLVE_PROCESS:
      const process = state.list.current.find(x => x.id === action.id)
      process.timings.completion = action.tick

      return {
        ...state,
        list: {
          ...state.list,
          current: state.list.current.filter(proc => proc.id !== action.id),
          resolved: [
            ...state.list.resolved,
            process
          ]
        }
      }
    case ALLOCATE_CPUTIME:
      const index = state.list.current.findIndex(x => x.id === action.id)
      state.list.current[index].cputime.done++

      if (!state.list.current[index].timings.start) {
        state.list.current[index].timings.start = action.tick
      }

      const incWaitingTime = x => {
        x.timings.waiting++
        return x
      }
      return {
        ...state,
        list: {
          ...state.list,
          current: [
            ...state.list.current.slice(0, index).map(incWaitingTime),
            state.list.current[index],
            ...state.list.current.slice(index + 1).map(incWaitingTime)
          ]
        }
      }
    case ADJUST_STRATEGY:
      return {
        ...state,
        strategy: {
          ...state.strategy,
          [action.strategy]: {
            [action.key]: action.value
          }
        }
      }
    default:
      return state
  }
}
