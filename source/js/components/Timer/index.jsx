import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

const Timer = (props) => {
  const now = new Date()
  const start = new Date(props.start)
  const difference = Math.floor((now.getTime() - start.getTime()) / 1000)

  return (
    <Flex
      wrap
    >
      <Box
        col={8}
      >
        <h5>Ticks</h5>
        <h1>{props.ticks}</h1>
      </Box>
      <Box
        col={4}
      >
        <h5>Seconds</h5>
        <h1>{difference}</h1>
      </Box>
    </Flex>
  )
}

export default connect(
  (state) => {
    return {
      ticks: state.timer.ticks,
      start: state.timer.start
    }
  }
)(Timer)
