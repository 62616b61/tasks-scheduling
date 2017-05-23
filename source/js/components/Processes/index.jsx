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
      <div style={{width: '40px'}}>{cputime.done + '/' + cputime.required}</div>,
      <Progress style={{width: '300px'}} color='primary' value={done} />
    ])
  })

  return (
    <Flex wrap>
      <Box col={2}>
        <h5>Active</h5>
        <h1>{props.processes.length}</h1>
      </Box>
      <Box col={4}>
        <h5>Resolved</h5>
        <h1>{props.numOfResolved}</h1>
      </Box>
      <Box col={12}>
        <Box className={styles.wrapper}>
          <Table
            data={tableData}
            headings={[
              '#',
              '',
              'Progress'
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
      processes: state.processes.list.current,
      numOfResolved: state.processes.list.resolved.length
    }
  }
)(Processes)
