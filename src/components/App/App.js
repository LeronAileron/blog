import React, { useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticlesList from '../ArticlesList'
import Article from '../Article'
import Pagination from '../Pagination'

import './app.scss'

function App() {
  const [page, setPage] = useState(1)

  const { error: fetchArticlesError, articlesTotal } = useSelector((state) => state.articles)
  // const { status: singleArticleStatus } = useSelector((state) => state.singleArticle)

  return (
    <div className="page-holder">
      <header className="header">
        <button className="button h6 button--naked button--blog">
          <Link to="/articles/">Realworld Blog</Link>
        </button>
        <div>
          <button className="button h6 button--naked">Sign In</button>
          <button className="button h6 button--success button--m-left">Sign Up</button>
        </div>
      </header>
      <main className="main">
        <Switch>
          <Route path="/articles/:slug">
            <Article />
          </Route>
          <Route path={['/articles/', '/']}>
            <ArticlesList page={page} />
          </Route>{' '}
        </Switch>
      </main>
      <Route exact path={['/articles/', '/']}>
        <footer className="footer">
          {!fetchArticlesError && <Pagination page={page} setPage={setPage} total={articlesTotal} />}
        </footer>
      </Route>
    </div>
  )
}

export default App
