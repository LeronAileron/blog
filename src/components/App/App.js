import React, { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticlesList from '../ArticlesList'
import Pagination from '../Pagination'

import './app.scss'

function App() {
  const [page, setPage] = useState(1)

  const { error: fetchArticlesError, articlesTotal } = useSelector((state) => state.articles)

  return (
    <div className="page-holder">
      <header className="header">
        <button className="button h6 button--naked button--blog">
          <Link to="/articles">Realworld Blog</Link>
        </button>
        <div>
          <button className="button h6 button--naked">Sign In</button>
          <button className="button h6 button--success button--m-left">Sign Up</button>
        </div>
      </header>
      <main className="main">
        <Route path={['/articles', '/']}>
          <ArticlesList page={page} />
        </Route>
      </main>
      <footer className="footer">
        {!fetchArticlesError && <Pagination page={page} setPage={setPage} total={articlesTotal} />}
      </footer>
    </div>
  )
}

export default App
