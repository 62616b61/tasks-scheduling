import React from 'react'
import { connect } from 'react-redux'
import { Box } from 'reflexbox'
import { Radio } from 'rebass'
import { Select as SelectStrategy } from '../../ducks/strategy'

const StrategySelector = (props) => {
  const strategies = ['FCFS', 'LCFS', 'RR', 'SJN', 'SRT']
  const radios = strategies.map(strategy => {
    return <Radio
      key={strategy}
      label={strategy}
      name={strategy}
      checked={props.strategy === strategy}
      onChange={() => props.SelectStrategy(strategy)}
    />
  })

  return (
    <Box w={2/3}>
      <h5>Strategy</h5>
      {radios}
    </Box>
  )
}

export default connect(
  (state) => {
    return {
      strategy: state.strategy.strategy
    }
  },
  (dispatch) => {
    return {
      SelectStrategy: (strategy) => dispatch(SelectStrategy(strategy))
    }
  }
)(StrategySelector)
