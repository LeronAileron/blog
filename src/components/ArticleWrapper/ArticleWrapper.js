import React from 'react'

import styles from './articleWrapper.module.scss'

const ArticleWrapper = ({ children }) => {
  return <article className={styles.article}>{children}</article>
}

export default ArticleWrapper
