import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './articleWrapper.module.scss'
let cx = classNames.bind(styles)

const ArticleWrapper = ({ children, extraClass }) => {
  const articleStyles = cx(['shadow-box', 'article', extraClass])
  return <article className={articleStyles}>{children}</article>
}

ArticleWrapper.propTypes = {
  children: PropTypes.node,
  extraClass: PropTypes.arrayOf(PropTypes.string),
}

export default ArticleWrapper
