import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../store'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInit: false,
    },
    reducers: {
        setInit(state, {payload}: PayloadAction<boolean>) {
            state.isInit = payload
        },
    },
})

export const selectIsInit = (state: RootState) => state.app.isInit

export const {setInit} = appSlice.actions

export default appSlice.reducer
