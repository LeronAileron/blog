import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import styles from './alert.module.scss'

const MyAlert = ({ description, type }) => {
  return <Alert className={styles.alert} message={'Ooops...'} description={description} type={type} />
}

export default MyAlert

MyAlert.defaultProps = {
  description: 'An unexpected error occurred. Please try again.',
  type: 'error',
}

MyAlert.propTypes = {
  description: PropTypes.string,
  type: PropTypes.string,
}
