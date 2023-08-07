import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './articlesSlice'
import singleArticleReducer from './singleArticleSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    singleArticle: singleArticleReducer,
  },
})
