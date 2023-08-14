import React from 'react'
import { useHistory } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { Popconfirm } from 'antd'
import classNames from 'classnames/bind'

import Tags from '../Tags'
import Button from '../Button'
import likeImg from '../../img/heart 1.svg'
import deleteArticle from '../../service/deleteArticle'

import styles from './articlePreview.module.scss'
let cx = classNames.bind(styles)

const ArticlePreview = ({ article, myArticle }) => {
  let history = useHistory()

  const { slug, title, favoritesCount, tagList: tags, description, author, createdAt } = article
  const { username, image } = author

  const created = format(new Date(createdAt), 'MMMM d, y')

  function handleClick() {
    history.push(`/articles/${slug}`)
  }

  const h5Classes = cx('article__title', 'h5')

  const articleActions = (
    <div>
      <Popconfirm
        placement="right"
        description="Are you sure to delete this article?"
        onConfirm={() => {
          console.log('confirm')
          deleteArticle(slug).then(() => history.push('/'))
        }}
        onCancel={() => console.log('cancel')}
        okText="Yes"
        cancelText="No"
      >
        <button className="button button--delete-tag button--small" type="button">
          Delete
        </button>
      </Popconfirm>

      <Button classes={['button--success', 'button--small']} linkTo={`/articles/${slug}/edit`}>
        Edit
      </Button>
    </div>
  )

  return (
    <div className={styles.article}>
      <div className={styles.article__content}>
        <h5 className={h5Classes} onClick={handleClick}>
          {title}
        </h5>
        <img className={styles.article__like} src={likeImg} />
        <span className={styles.article__likes}>{favoritesCount}</span>
        <Tags className={styles.article__tags} tags={tags} />
        <div className={styles.article__description}>{description}</div>
      </div>
      <div className={styles['article__author-info']}>
        <h6 className={`h6 ${styles['article__author-name']}`}>{username}</h6>
        <img src={image} alt={`Аватарка пользователя ${username}`} className="avatar" />
        <div className={styles.article__created}>{created}</div>
        {myArticle && articleActions}
      </div>
    </div>
  )
}

export default ArticlePreview
