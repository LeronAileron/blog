import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOutHeader = () => {
  return (
    <div>
      <button className="button h6 button--naked">
        <Link to="/sign-in">Sign In</Link>
      </button>
      <button className="button h6 button--success button--m-left">
        <Link to="/sign-up">Sign Up</Link>
      </button>
    </div>
  )
}

export default LoggedOutHeader
