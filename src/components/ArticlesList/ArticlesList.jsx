import React from 'react'
import { useSelector } from 'react-redux'

import ArticleWrapper from '../ArticleWrapper'
import ArticlePreview from '../ArticlePreview'
import Spinner from '../Spinner'
import Alert from '../Alert'

import styles from './articlesList.module.scss'

const ArticlesList = () => {
  const { articles: fetchedArticles, error, status } = useSelector((state) => state.articles)

  let key = 100

  const articles = fetchedArticles.map((el) => {
    key++
    return (
      <li key={key} className={styles.list__item}>
        <ArticleWrapper>
          <ArticlePreview article={el} />
        </ArticleWrapper>
      </li>
    )
  })
  return (
    <>
      {error && <Alert description={error} />}
      {status === 'loading' && <Spinner />}
      <ul className={styles.list}>{articles}</ul>
    </>
  )
}

export default ArticlesList
