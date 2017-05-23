import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import ProcessesTable from './ProcessesTable'

const Processes = (props) => {
  return (
    <Flex>
      <Box
        col={12}
      >
        <h5>Processes</h5>
        <ProcessesTable processes={props.current} />
      </Box>
    </Flex>
  )
}

export default connect(
  (state) => {
    return {
      current: state.processes.list.current
    }
  }
)(Processes)
