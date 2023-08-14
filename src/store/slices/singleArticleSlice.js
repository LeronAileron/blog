import { createSlice } from '@reduxjs/toolkit'

import fetchSingleArticle from '../functions/fetchSingleArticle'
import setRejectedStatus from '../functions/setRejectedStatus'

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleArticle.rejected, setRejectedStatus)
      .addCase(fetchSingleArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.article = action.payload.article
      })
  },
})

export default singleArticleSlice.reducer
