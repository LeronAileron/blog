import React from 'react'
import PropTypes from 'prop-types'
import { Pagination, ConfigProvider } from 'antd'

const PaginationComp = ({ page, setPage, total }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1890FF',
          colorPrimary: 'fff',
        },
      }}
    >
      <Pagination current={page} total={total} onChange={(page) => setPage(page)} showSizeChanger={false} />
    </ConfigProvider>
  )
}

export default PaginationComp

PaginationComp.defaultProps = {
  page: 1,
}

PaginationComp.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
}
