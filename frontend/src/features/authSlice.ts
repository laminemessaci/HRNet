import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialValues: IAuth = {
  token: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    /**
     * Sets the credentials with the given access token.
     *
     * @param state - The current state.
     * @param action - The action containing the access token.
     */
    setCredentials: (state: IAuth, action: PayloadAction<{ accessToken: string }>): void => {
      const { accessToken } = action.payload
      state.token = accessToken
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
