import React from 'react'
import {useSelector} from 'react-redux'
import {selectToken} from '../../slices/user'
import {Navigate} from 'react-router-dom'

type Props = {
    children: JSX.Element
}

export default function AuthCheck(props: Props) {
    const token = useSelector(selectToken)

    return token ? props.children : <Navigate to="/sign" />
}
