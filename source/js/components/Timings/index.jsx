import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import * as styles from './styles.css'

const Timings = (props) => {
  const headings = ['#', 'Burst time', 'Waiting time', 'Turnaround time']
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
          <table>
            <thead>
              <tr>
                {headings.map((heading, i) => (
                  <th key={i}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {row.map((d, j) => (
                    <td key={j}>{d}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
