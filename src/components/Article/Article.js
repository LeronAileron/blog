import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// import Markdown from 'markdown-to-jsx'
import ReactMarkdown from 'react-markdown'

import { fetchArticle } from '../../store/singleArticleSlice'
import ArticleWrapper from '../ArticleWrapper'
import ArticlePreview from '../ArticlePreview'

import styles from './article.module.scss'

const Article = () => {
  const dispatch = useDispatch()

  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [slug])

  const { article, status } = useSelector((state) => state.singleArticle)
  // console.log(article)

  if (status !== 'resolved') return
  const { body } = article

  return (
    <ArticleWrapper>
      <ArticlePreview article={article} />
      <div className={styles.article__body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </ArticleWrapper>
  )
}

export default Article
