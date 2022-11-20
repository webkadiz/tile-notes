import {createAsyncThunk} from '@reduxjs/toolkit'
import {syncTasks} from '../task'
import {setToken, setUserInfo} from '../user'
import {setInit} from './slice'

export const initApp = createAsyncThunk('app/init', async (_, {dispatch}) => {
    try {
        const token = localStorage.getItem('token') || ''
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

        if (userInfo && token) {
            dispatch(setToken(token))
            dispatch(setUserInfo(userInfo))
        }

        dispatch(syncTasks())
        dispatch(setInit(true))
    } catch (e) {
        throw e
    }
})
