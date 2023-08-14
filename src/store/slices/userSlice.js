import { createSlice } from '@reduxjs/toolkit'

import postSignIn from '../functions/postSignIn'
import fetchCurrentUser from '../functions/fetchCurrentUser'
import putUserChanges from '../functions/putUserChanges'
import setRejectedStatus from '../functions/setRejectedStatus'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: null,
    error: null,
    loggedIn: false,
  },
  reducers: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn
    },
    logOutUser(state) {
      state.user = null
      state.status = null
      state.error = null
      state.loggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignIn.rejected, setRejectedStatus)
      .addCase(postSignIn.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.user = action.payload.user
      })
      .addCase(fetchCurrentUser.rejected, setRejectedStatus)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.user = action.payload.user
        state.loggedIn = true
      })
      .addCase(putUserChanges.rejected, setRejectedStatus)
      .addCase(putUserChanges.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.error = null
        state.user = action.payload.user
      })
  },
})

export const { toggleLoggedIn, logOutUser } = userSlice.actions

export default userSlice.reducer
