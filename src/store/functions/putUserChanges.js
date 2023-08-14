import { createAsyncThunk } from '@reduxjs/toolkit'

import _apiBase from '../../service/_apiBase'

const putUserChanges = createAsyncThunk('user/putUserChanges', async function (data, { rejectWithValue }) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: data,
    }),
  }

  try {
    const res = await fetch(`${_apiBase}user`, options)
    if (!res.ok) {
      if (res.status == 422 || res.status == 500) {
        const theError = await res.json()

        let message = ''
        Object.entries(theError.errors).map(([key, value]) => {
          message += `${key} ${value}`
        })

        console.log(message)

        throw new Error(message)
      } else {
        throw new Error(`Unable to send register request, status ${res.status}`)
      }
    }

    const updated = await res.json()
    return updated
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export default putUserChanges
