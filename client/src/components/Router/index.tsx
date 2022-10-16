import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from '../../pages/Home'
import TaskApp from '../../pages/TaskApp'
import Sign from '../../pages/Sign'
import {AppDispatch} from '../../store'
import {initApp, selectIsInit} from '../../slices/app'
import { selectToken } from '../../slices/user'
import withAuth from '../../decorators/withApp'

export default function Router() {
    const isInit = useSelector(selectIsInit)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        console.log('effect')
        dispatch(initApp())
    }, [])

    return isInit ? (
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={withAuth(TaskApp)} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/" element={withAuth(Home)} />
            </Routes>
        </BrowserRouter>
    ) : null
}
