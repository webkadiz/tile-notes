import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import cn from 'classnames'
import FormInput from '../components/FormInput'
import styles from './sign.module.scss'
import {selectToken, userSignin, userSignup} from '../slices/user'
import {message} from 'antd'
import {useSelector} from 'react-redux'
import { initApp } from '../slices/app'
import { syncTasks } from '../slices/task'

export default function Sign() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isSignup, setIsSignup] = useState(true)
    const token = useSelector(selectToken)

    const changeLogin = (e) => setLogin(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    const signup = () => {
        dispatch(userSignup({login, password})).then((res) => {
            if (res.error) {
                message.error(res.error.message)
                return
            }

            dispatch(syncTasks())
            message.success('Регистрация прошла успешно')
            navigate('/app')
        })
    }

    const signin = () => {
        dispatch(userSignin({login, password})).then((res) => {
            if (res.error) {
                message.error(res.error.message)
                return
            }

            dispatch(syncTasks())
            message.success('Вход успешно выполнен')
            navigate('/app')
        })
    }

    if (token) return <Navigate to="/app" />

    return (
        <div className={cn(styles.container)}>
            <div className={cn('card', 'elevation-1', styles.signCard)}>
                <div className={cn(styles.signTab)}>
                    <button
                        className="btn-link"
                        onClick={setIsSignup.bind(null, true)}
                    >
                        Регистрация
                    </button>
                    |
                    <button
                        className="btn-link"
                        onClick={setIsSignup.bind(null, false)}
                    >
                        Вход
                    </button>
                </div>
                {!isSignup && (
                    <>
                        <FormInput
                            value={login}
                            onChange={changeLogin}
                            placeholder="Логин"
                            className="mb-2"
                        />
                        <FormInput
                            value={password}
                            onChange={changePassword}
                            placeholder="Пароль"
                            className="mb-2"
                        />
                        <button className="btn" onClick={signin}>
                            Войти
                        </button>
                    </>
                )}

                {isSignup && (
                    <>
                        <FormInput
                            value={login}
                            onChange={changeLogin}
                            placeholder="Логин"
                            className="mb-2"
                        />
                        <FormInput
                            value={password}
                            onChange={changePassword}
                            placeholder="Пароль"
                            className="mb-2"
                        />
                        <button className="btn" onClick={signup}>
                            Регистрация
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
