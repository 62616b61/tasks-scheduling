import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { Table, Progress } from 'rebass'
import * as styles from './styles.css'

const Processes = (props) => {
  const tableData = props.processes.map((proc) => {
    const cputime = proc.cputime
    const done = cputime.done / cputime.required

    return ([
      proc.id,
      <Progress color='primary' value={done} />,
      cputime.done + '/' + cputime.required
    ])
  })

  return (
    <Flex>
      <Box
        col={12}
      >
        <h5>Processes</h5>
        <Box className={styles.wrapper}>
          <Table
            data={tableData}
            headings={[
              '#',
              'Progress',
              ''
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
      processes: state.processes.list.current
    }
  }
)(Processes)
