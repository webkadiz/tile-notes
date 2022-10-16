import React from 'react'
import {Navigate} from 'react-router'
import {selectToken} from '../slices/user'
import store from '../store'

export default function withAuth(WrappedComponent: React.FunctionComponent) {
    const state = store.getState()
    const token = selectToken(state)

    return token ? <WrappedComponent /> : <Navigate to="/sign" />
}
