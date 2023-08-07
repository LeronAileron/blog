import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Tags from '../Tags'

import styles from './articlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  const { title, tagList: tags, description, author, createdAt } = article
  const { username, image } = author

  const created = format(new Date(createdAt), 'MMMM d, y')

  return (
    <article className={styles.article}>
      <div className={styles.article__content}>
        <h5 className={styles.article__title}>{title}</h5>
        <Tags className={styles.article__tags} tags={tags} />
        <div className={styles.article__description}>{description}</div>
      </div>
      <div className={styles['article__author-info']}>
        <h6 className={`h6 ${styles['article__author-name']}`}>{username}</h6>
        <img src={image} alt={`Аватарка пользователя ${username}`} className={styles['article__author-img']} />
        <div className={styles.article__created}>{created}</div>
      </div>
    </article>
  )
}

export default ArticlePreview

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      following: PropTypes.bool.isRequired,
    }),
  }),
  body: PropTypes.string,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string,
  tagList: PropTypes.array,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
}
