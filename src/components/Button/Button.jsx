import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({ children, classes, linkTo, onClick }) => {
  const buttonClasses = classNames('button', ...classes)
  return (
    <button className={buttonClasses} onClick={onClick}>
      <Link to={linkTo}>{children}</Link>
    </button>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.array,
  linkTo: PropTypes.string,
  onClick: PropTypes.func,
}
