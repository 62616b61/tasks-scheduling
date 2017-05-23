import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import {Tick as TimerTick} from 'ducks/timer'

import Timer from 'components/Timer'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  componentDidMount () {
    let timer = setInterval(() => {
      this.props.TimerTick()
    }, 1000)
    this.setState({timer})
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  render () {
    return (
      <Flex justify='center' wrap>
        <Flex col={8}>
          <Box
            col={2}
            p={3}
          >
            <Timer />
          </Box>
          <Box
            col={7}
            p={3}
          >
            Hey
          </Box>
          <Box
            col={3}
            p={3}
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
      TimerTick: () => dispatch(TimerTick())
    }
  }
)(Home)
