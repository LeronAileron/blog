import { createAsyncThunk } from '@reduxjs/toolkit'

import _apiBase from '../../service/_apiBase'

const fetchSingleArticle = createAsyncThunk('singleArticle/fetchArticle', async function (slug, { rejectWithValue }) {
  try {
    const articleHeads = await fetch(`${_apiBase}/articles/${slug}`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    if (!articleHeads.ok) {
      throw new Error(`Unable to load the article, error status: ${articleHeads.status}`)
    }

    const article = await articleHeads.json()
    return article
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export default fetchSingleArticle
