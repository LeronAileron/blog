import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import fetchSingleArticle from '../../store/functions/fetchSingleArticle'
import ArticleWrapper from '../ArticleWrapper'
import ArticlePreview from '../ArticlePreview'

import styles from './article.module.scss'

const Article = () => {
  const dispatch = useDispatch()

  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [slug])

  const user = useSelector((state) => state.user.user)
  const { article, status } = useSelector((state) => state.singleArticle)

  if (status !== 'resolved') return

  const { body, author } = article

  let myArticle = false
  let currentUsername
  if (user) {
    currentUsername = user.username

    if (currentUsername === author.username) {
      myArticle = true
    }
  }

  return (
    <ArticleWrapper>
      <ArticlePreview article={article} myArticle={myArticle} />
      <div className={styles.article__body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </ArticleWrapper>
  )
}

export default Article
