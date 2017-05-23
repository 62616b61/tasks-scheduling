import React from 'react'
import { connect } from 'react-redux'

const Timer = (props) => {
  return (
    <div>
      <h5>Ticks</h5>
      <h1>{props.ticks}</h1>
    </div>
  )
}

export default connect(
  (state) => {
    return {
      ticks: state.timer.ticks
    }
  }
)(Timer)
