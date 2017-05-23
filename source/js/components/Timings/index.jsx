import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { Table } from 'rebass'
import * as styles from './styles.css'

const Timings = (props) => {
  const tableData = props.processes.map((proc) => {
    const t = proc.timings
    const turnaround = (t.completion - t.start) / 1000

    return ([
      proc.id,
      'kek',
      'lul',
      turnaround
    ])
  })

  return (
    <Flex>
      <Box
        col={12}
      >
        <h5>Timings</h5>
        <Box className={styles.wrapper}>
          <Table
            data={tableData}
            headings={[
              '#',
              'Burst time',
              'Waiting time',
              'Turnaround time'
            ]}
          />
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
