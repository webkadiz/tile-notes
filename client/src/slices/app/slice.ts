import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import {RootState} from '../../store'

type State = {
    isInit: boolean
    socket: Socket | null
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInit: false,
        socket: null
    } as State,
    reducers: {
        setInit(state, {payload}: PayloadAction<boolean>) {
            state.isInit = payload
        },
        setSocket(state, {payload}: PayloadAction<Socket | null>) {
            state.socket = payload as any
        }
    },
})

export const selectIsInit = (state: RootState) => state.app.isInit
export const selectSocket = (state: RootState) => state.app.socket

export const {setInit, setSocket: setSocketAction} = appSlice.actions

export default appSlice.reducer
