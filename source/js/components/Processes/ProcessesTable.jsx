import React from 'react'
import { Table, Progress } from 'rebass'

const ProcessesTable = (props) => {
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
    <Table
      data={tableData}
      headings={[
        '#',
        'Progress',
        ''
      ]}
    />
  )
}

export default ProcessesTable
