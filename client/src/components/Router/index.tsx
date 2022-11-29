import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from '../../pages/Home'
import TaskApp from '../../pages/TaskApp'
import Sign from '../../pages/Sign'
import {AppDispatch} from '../../store'
import {initApp, selectIsInit} from '../../slices/app'
import AuthCheck from '../AuthCheck'
import SharingTask from '../SharingTask.tsx'

export default function Router() {
    const isInit = useSelector(selectIsInit)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initApp())
    }, [])

    return isInit ? (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/app"
                    element={
                        <AuthCheck>
                            <TaskApp />
                        </AuthCheck>
                    }
                />
                <Route path="/sign" element={<Sign />} />
                <Route path="/task/:link" element={<SharingTask />} />
                <Route
                    path="/"
                    element={
                        <AuthCheck>
                            <Home />
                        </AuthCheck>
                    }
                />
            </Routes>
        </BrowserRouter>
    ) : null
}
