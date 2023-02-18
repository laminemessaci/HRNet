import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialValues: IAuth = {
  token: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload
      state.token = accessToken
      // state.token = action.payload.token
    },
    logOut: (state, action: PayloadAction<{ token: string }>) => {
      state.token = null
    },
    defaultState: (state) => {
      state = initialValues
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token

// Initiate types
export interface IAuth {
  token: string | null
  accessToken: string | null
}
