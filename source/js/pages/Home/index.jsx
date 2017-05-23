import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { Tick as ProcTick, Init as ProcInit } from 'ducks/processes'
import { Tick as TimerTick, Start as TimerStart } from 'ducks/timer'

import Timer from 'components/Timer'
import StrategySelector from 'components/StrategySelector'
import Processes from 'components/Processes'
import Timings from 'components/Timings'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  componentDidMount () {
    this.props.TimerStart()
    this.props.ProcInit()

    let timer = setInterval(() => {
      this.props.TimerTick()
      this.props.ProcTick()
    }, 20)
    this.setState({timer})
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  render () {
    return (
      <Flex justify='center' wrap>
        <Flex col={10}>
          <Box col={2} p={2}>
            <Timer />
            <StrategySelector />
          </Box>
          <Box col={6} p={2}>
            <Processes />
          </Box>
          <Box col={4} p={2}>
            <Timings />
          </Box>
        </Flex>
      </Flex>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => {
    return {
      TimerStart: () => dispatch(TimerStart()),
      TimerTick: () => dispatch(TimerTick()),
      ProcInit: () => dispatch(ProcInit()),
      ProcTick: () => dispatch(ProcTick())
    }
  }
)(Home)
