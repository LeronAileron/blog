import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './tags.module.scss'

let cx = classNames.bind(styles)

const Tags = ({ tags }) => {
  let key = 200
  const tagList = tags.map((tag) => {
    key++

    if (!tag) return

    let tagLiStyles = cx(['tag', 'tag--margin'])

    return (
      <li key={key} className={tagLiStyles}>
        {tag}
      </li>
    )
  })

  return <ul className={styles['tags-ul']}>{tagList}</ul>
}

export default Tags

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}
