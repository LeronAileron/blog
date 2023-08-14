import { createAsyncThunk } from '@reduxjs/toolkit'

import _apiBase from '../../service/_apiBase'

const fetchArticles = createAsyncThunk('articles/fetchArticles', async function ({ page, limit }, { rejectWithValue }) {
  try {
    const offset = (page - 1) * limit
    const articlesHeads = await fetch(`${_apiBase}articles?limit=${limit}&offset=${offset}`)
    if (!articlesHeads.ok) {
      throw new Error(`Cannot fetch articles, status ${articlesHeads.status}`)
    }

    const articlesData = await articlesHeads.json()
    return articlesData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export default fetchArticles
