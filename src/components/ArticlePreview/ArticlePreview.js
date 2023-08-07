import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Tags from '../Tags'
import img from '../../img/heart 1.svg'

import styles from './articlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  let history = useHistory()
  const { slug, title, favoritesCount, tagList: tags, description, author, createdAt } = article
  const { username, image } = author

  const created = format(new Date(createdAt), 'MMMM d, y')

  function handleClick() {
    history.push(`/articles/${slug}`)
  }

  return (
    <div className={styles.article}>
      <div className={styles.article__content}>
        <h5 className={styles.article__title} onClick={handleClick}>
          {title}
        </h5>
        <img className={styles.article__img} src={img} />
        <span className={styles.article__likes}>{favoritesCount}</span>
        <Tags className={styles.article__tags} tags={tags} />
        <div className={styles.article__description}>{description}</div>
      </div>
      <div className={styles['article__author-info']}>
        <h6 className={`h6 ${styles['article__author-name']}`}>{username}</h6>
        <img src={image} alt={`Аватарка пользователя ${username}`} className={styles['article__author-img']} />
        <div className={styles.article__created}>{created}</div>
      </div>
    </div>
  )
}

export default ArticlePreview

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
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
