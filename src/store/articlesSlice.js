import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import setRejectedStatus from './functions/setRejectedStatus'

const _apiBase = 'https://blog.kata.academy/api/'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (page, { rejectWithValue }) {
  try {
    const offset = (page - 1) * 5
    const articlesHeads = await fetch(`${_apiBase}articles?limit=5&offset=${offset}`)
    if (!articlesHeads.ok) {
      throw new Error(`Cannot fetch articles, status ${articlesHeads.status}`)
    }

    const articlesData = await articlesHeads.json()
    return articlesData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

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
        state.articles = action.payload.articles
        state.articlesTotal = action.payload.articlesCount
        state.error = null
      })
  },
})

export default articlesSlice.reducer
