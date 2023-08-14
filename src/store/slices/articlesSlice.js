import { createSlice } from '@reduxjs/toolkit'

import fetchArticles from '../functions/fetchArticles'
import setRejectedStatus from '../functions/setRejectedStatus'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesTotal: 0,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.rejected, setRejectedStatus)
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.articles = action.payload.articles
        state.articlesTotal = action.payload.articlesCount
      })
  },
})

export default articlesSlice.reducer
