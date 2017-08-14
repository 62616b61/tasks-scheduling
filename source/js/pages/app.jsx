import React from 'react'
import { Provider } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import Home from './Home'

import '../../style/index.global.css'

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <Flex wrap>
        <Box w={1}>
          <Home />
        </Box>
      </Flex>
    </Provider>
  )
}

export default Root
