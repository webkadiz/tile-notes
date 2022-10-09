import {createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../../api'
import {UserCreds} from './slice'
import {AxiosError} from 'axios'

export const userSignup = createAsyncThunk(
    'user/signup',
    async (userCreds: UserCreds) => {
        try {
            const res = await api.signup(userCreds)
            console.log(res)

            if (res.data.error) throw new Error(res.data.message)

            localStorage.setItem('token', res.data.data.token)

            return res.data.data
        } catch (e) {
            if (e instanceof AxiosError) throw new Error('Ошибка сети')

            throw e
        }
    }
)

export const userSignin = createAsyncThunk(
    'user/signup',
    async (userCreds: UserCreds) => {
        try {
            const res = await api.signin(userCreds)
            console.log(res)

            if (res.data.error) throw new Error(res.data.message)

            localStorage.setItem('token', res.data.data.token)

            return res.data.data
        } catch (e) {
            if (e instanceof AxiosError) throw new Error('Ошибка сети')

            throw e
        }
    }
)
