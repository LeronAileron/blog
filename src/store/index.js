import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'
import singleArticleReducer from './slices/singleArticleSlice'
import userReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    singleArticle: singleArticleReducer,
    user: userReducer,
  },
})
