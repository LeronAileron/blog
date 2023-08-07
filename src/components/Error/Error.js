import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import styles from './error.module.scss'

const Error = ({ description, type }) => {
  return <Alert className={styles.error} message={'Ошибка'} description={description} type={type} />
}

export default Error

Error.defaultProps = {
  type: 'error',
}

Error.propTypes = {
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
}
