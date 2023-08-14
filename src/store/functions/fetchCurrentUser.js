import { createAsyncThunk } from '@reduxjs/toolkit'

import _apiBase from '../../service/_apiBase'

const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async function (token, { rejectWithValue }) {
  try {
    const res = await fetch(`${_apiBase}user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error(`An error here, error status: ${res.status}`)
    }

    const user = await res.json()
    return user
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export default fetchCurrentUser
