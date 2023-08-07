import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import setRejectedStatus from './functions/setRejectedStatus'

const _apiBase = 'https://blog.kata.academy/api/articles/'

export const fetchArticle = createAsyncThunk('singleArticle/fetchArticle', async function (slug, { rejectWithValue }) {
  try {
    const articleHeads = await fetch(`${_apiBase}${slug}`)
    if (!articleHeads.ok) {
      throw new Error(`Unable to load the article, error status: ${articleHeads.status}`)
    }

    const article = await articleHeads.json()
    return article
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

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
      .addCase(fetchArticle.rejected, setRejectedStatus)
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.article = action.payload.article
      })
  },
})

export default singleArticleSlice.reducer
