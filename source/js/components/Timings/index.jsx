import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import * as styles from './styles.css'

const Timings = (props) => {
  const tableData = props.processes.map((proc) => {
    const t = proc.timings
    const burst = proc.cputime.required
    const turnaround = t.completion - t.start
    const waiting = t.waiting

    return ([
      proc.id,
      burst,
      waiting,
      turnaround
    ])
  })

  return (
    <Flex>
      <Box  w={1}>
        <h5>Timings</h5>
        <Box className={styles.wrapper}>
          <p>put table 'ere</p>
        </Box>
      </Box>
    </Flex>
  )
}

export default connect(
  (state) => {
    return {
      processes: state.processes.list.resolved
    }
  }
)(Timings)
