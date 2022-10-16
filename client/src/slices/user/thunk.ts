import {createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../../api'
import {setToken, setUserInfo, UserCreds} from './slice'
import {AxiosError} from 'axios'

export const userSignup = createAsyncThunk(
    'user/signup',
    async (userCreds: UserCreds, {dispatch}) => {
        try {
            const res = await api.signup(userCreds)

            if (res.data.error) throw new Error(res.data.message)

            const userState = res.data.data

            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userInfo', JSON.stringify(userState.userInfo))
            dispatch(setToken(userState.token))
            dispatch(setUserInfo(userState.userInfo))
        } catch (e) {
            if (e instanceof AxiosError) throw new Error('Ошибка сети')

            throw e
        }
    }
)

export const userSignin = createAsyncThunk(
    'user/signup',
    async (userCreds: UserCreds, {dispatch}) => {
        try {
            const res = await api.signin(userCreds)

            if (res.data.error) throw new Error(res.data.message)

            const userState = res.data.data

            localStorage.setItem('token', userState.token)
            localStorage.setItem('userInfo', JSON.stringify(userState.userInfo))
            dispatch(setToken(userState.token))
            dispatch(setUserInfo(userState.userInfo))
        } catch (e) {
            if (e instanceof AxiosError) throw new Error('Ошибка сети')

            throw e
        }
    }
)

// export const getUserInfo = createAsyncThunk('user/getInfo', async () => {
//     try {
//         const res = await api.getUserInfo()

//         if (res.data.error) throw new Error(res.data.message)

//         const userInfo = res.data.data

//         setLogin(userInfo.login)
//     } catch (e) {
//         if (e instanceof AxiosError) throw new Error('Ошибка сети')

//         throw e
//     }
// })
