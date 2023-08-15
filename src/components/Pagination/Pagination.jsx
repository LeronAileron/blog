import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Pagination, ConfigProvider } from 'antd'

import NotFoundPage from '../NotFoundPage'

import styles from './Pagination.module.scss'

const PaginationComp = ({ page, setPage, total, limit, setLimit }) => {
  const location = useLocation()
  const history = useHistory()

  if (location.pathname.startsWith('/articles') && page - 1 > total / limit)
    return (
      <div className={styles['not-found']}>
        <NotFoundPage />
      </div>
    )

  function onShowSizeChange(current, pageSize) {
    setLimit(pageSize)
  }

  function onPageChange(page) {
    setPage(page)
    history.push(`/articles?page=${page}`)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1890FF',
          colorPrimary: 'fff',
        },
      }}
    >
      <Pagination
        pageSizeOptions={[5, 10, 15, 20, 25]}
        defaultPageSize={5}
        current={page}
        total={total}
        onChange={onPageChange}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    </ConfigProvider>
  )
}

export default PaginationComp

PaginationComp.defaultProps = {
  page: 1,
  limit: 5,
}

PaginationComp.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number,
  setLimit: PropTypes.func.isRequired,
}
