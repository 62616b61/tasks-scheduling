import React from 'react'

import { Flex, Box } from 'reflexbox'

const About = () => {
  return (
    <Flex justify='center'>
      <Box col={8}>
        <h2>About</h2>
        <p>Developed by Cry</p>
        <p>Check out <a href='http://whynot.crybot.net'>whynot.crybot.net</a></p>
      </Box>
    </Flex>
  )
}

export default About
