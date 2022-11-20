import { message } from 'antd'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {io} from 'socket.io-client'
import styled from 'styled-components'
import TaskCreationBlock from '../components/TaskCreationBlock'
import TaskList from '../components/TaskList'
import socketService from '../services/socket-service'
import {recalculateTasksAction, syncTasks} from '../slices/task'
import {selectUserInfo, setToken, setUserInfo} from '../slices/user'
import {AppDispatch} from '../store'

export default function TaskApp() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector(selectUserInfo)

    const recalculate = () => {
        dispatch(recalculateTasksAction())
    }

    const offline = () => {
        message.info('Вы в оффлайне')
    }

    const online = () => {
        message.info('Вы в онлайне')
        dispatch(syncTasks())
    }

    useEffect(() => {
        const socket = io('ws://localhost:4001', {
            transports: ['websocket', 'polling'], // use WebSocket first, if available
            query: userInfo,
        })

        socket.on('update', () => {
            console.log('update ws')
            dispatch(syncTasks())
        })

        socketService.setSocket(socket)

        window.addEventListener('focus', recalculate)
        window.addEventListener('online', online)
        window.addEventListener('offline', offline)

        return () => {
            window.removeEventListener('online', online)
            window.removeEventListener('offline', offline)
            window.removeEventListener('focus', recalculate)
            socketService.setSocket(null)
            socket.disconnect()
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(setToken(''))
        dispatch(setUserInfo({login: ''}))
        navigate('/sign')
    }

    return (
        <div className="app">
            <Logout>
                Пользователь {userInfo.login}
                <button className="btn" onClick={logout}>
                    Выйти
                </button>
            </Logout>
            <TaskCreationBlock />
            <TaskList />
        </div>
    )
}

const Logout = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
        margin-left: 10px;
    }
`
