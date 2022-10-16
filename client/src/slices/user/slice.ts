import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../store'

export type UserCreds = {
    login: string
    password: string
}

export type UserToken = string

export type UserInfo = {
    login: string
}

export type UserState = {
    token: UserToken
    userInfo: UserInfo
}

const initialState = {token: '', userInfo: {login: ''}} as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, {payload}: PayloadAction<UserToken>) {
            state.token = payload
        },
        setUserInfo(state, {payload}: PayloadAction<UserInfo>) {
            state.userInfo = payload
        },
    },
})

export const selectToken = (state: RootState) => state.user.token
export const selectUserInfo = (state: RootState) => state.user.userInfo

export const {setToken, setUserInfo} = userSlice.actions

export default userSlice.reducer
