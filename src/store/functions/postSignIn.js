import { createAsyncThunk } from '@reduxjs/toolkit'

import _apiBase from '../../service/_apiBase'

const postSignIn = createAsyncThunk('user/postSignIn', async function ({ email, password }, { rejectWithValue }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }

  try {
    const res = await fetch(`${_apiBase}users/login`, options)
    if (!res.ok) {
      if (res.status == 422) {
        const theError = await res.json()

        let message = ''
        Object.entries(theError.errors).map(([key, value]) => {
          message += `${key} ${value}`
        })

        throw new Error(message)
      } else {
        throw new Error(`Unable to send register request, status ${res.status}`)
      }
    }

    const user = await res.json()

    return user
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export default postSignIn
