import React, { useState, useEffect } from 'react'
import { Route, Link, Switch, useLocation, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LoggedOutHeader from '../LoggedOutHeader'
import LoggedInHeader from '../LoggedInHeader'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Profile from '../Profile'
import ArticlesList from '../ArticlesList'
import Article from '../Article'
import Pagination from '../Pagination'
import NotFoundPage from '../NotFoundPage'
import Alert from '../Alert'
import ArticleActions from '../ArticleActions'
import './app.scss'
import fetchArticles from '../../store/functions/fetchArticles'
import fetchCurrentUser from '../../store/functions/fetchCurrentUser'

function App() {
  const location = useLocation()

  const locationPage = getPage(location)
  if (locationPage && isNaN(locationPage)) return <NotFoundPage />

  const [page, setPage] = useState(locationPage || 1)
  const [limit, setLimit] = useState(5)

  const showPagination =
    location.pathname === '/' || location.pathname === '/articles/' || location.search.includes('?page=') ? true : false

  const { error: fetchArticlesError, articlesTotal } = useSelector((state) => state.articles)
  const { error: createAccountError, loggedIn } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ page, limit }))
  }, [page, limit, location.pathname])

  useEffect(() => {
    const logged = localStorage.getItem('token')
    if (logged) {
      dispatch(fetchCurrentUser(logged))
    }
  }, [])

  return (
    <div className="page-holder">
      <header className="header">
        <button className="button h6 button--naked button--blog">
          <h6 className="h6">
            <Link to="/articles/">Realworld Blog</Link>
          </h6>
        </button>
        {!loggedIn && <LoggedOutHeader />}
        {loggedIn && <LoggedInHeader />}
      </header>
      <main className="main">
        <Switch>
          <Route path="/sign-up">{!createAccountError ? <SignUp /> : <Alert description={createAccountError} />}</Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <PrivateRoute path={'/articles/:slug/edit'}>
            <ArticleActions />
          </PrivateRoute>
          <Route path="/articles/:slug">
            <Article />
          </Route>
          <PrivateRoute path="/new-article">
            <ArticleActions />
          </PrivateRoute>
          <Route path={[`/articles?page=${page}`, '/']}>
            <ArticlesList />
          </Route>
        </Switch>
      </main>
      <footer className="footer">
        {showPagination && !fetchArticlesError && (
          <Pagination page={page} setPage={setPage} total={articlesTotal} limit={limit} setLimit={setLimit} />
        )}
      </footer>
    </div>
  )
}

export default App

function getPage(location) {
  const pageQuery = '?page='
  let locationPage

  if (location.search.startsWith(pageQuery)) {
    locationPage = location.search.slice(pageQuery.length)
    locationPage = parseInt(locationPage)
  }
  return locationPage
}

function PrivateRoute({ children, ...rest }) {
  const { loggedIn } = useSelector((state) => state.user)
  return <Route {...rest} render={() => (loggedIn ? children : <Redirect to="/sign-in" />)} />
}
