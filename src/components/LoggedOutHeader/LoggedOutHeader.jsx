import React from 'react'

import Button from '../Button'

const LoggedOutHeader = () => {
  return (
    <div>
      <Button classes={['button--naked', 'h6']} linkTo="/sign-in">
        Sign In
      </Button>

      <Button classes={['button--success', 'button--m-left', 'h6']} linkTo="/sign-up">
        Sign Up
      </Button>
    </div>
  )
}

export default LoggedOutHeader
