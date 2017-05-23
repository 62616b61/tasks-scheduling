import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import {Tick as TimerTick, Start as TimerStart} from 'ducks/timer'

import Timer from 'components/Timer'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  componentDidMount () {
    this.props.TimerStart()
    let timer = setInterval(() => {
      this.props.TimerTick()
    }, 50)
    this.setState({timer})
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  render () {
    return (
      <Flex justify='center' wrap>
        <Flex col={10}>
          <Box
            col={2}
            p={2}
          >
            <Timer />
          </Box>
          <Box
            col={7}
            p={2}
          >
            Hey
          </Box>
          <Box
            col={3}
            p={2}
          >
            Hey
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
      TimerTick: () => dispatch(TimerTick())
    }
  }
)(Home)
