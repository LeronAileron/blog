import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import classes from './tags.module.scss'

let cx = classNames.bind(classes)

const Tags = ({ tags }) => {
  let key = 200
  const tagList = tags.map((tag) => {
    key++

    if (!tag) return

    let styles = cx(['tag', 'tag--margin'])

    return (
      <li key={key} className={styles}>
        {tag}
      </li>
    )
  })

  return <ul>{tagList}</ul>
}

export default Tags

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}
