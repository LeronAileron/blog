import React from 'react'
import classNames from 'classnames/bind'

import styles from './articleWrapper.module.scss'
let cx = classNames.bind(styles)

const ArticleWrapper = ({ children }) => {
  const articleStyles = cx(['shadow-box', 'article'])
  return <article className={articleStyles}>{children}</article>
}

export default ArticleWrapper
