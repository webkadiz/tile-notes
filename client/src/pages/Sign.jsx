import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import cn from 'classnames'
import FormInput from '../components/FormInput'
import ErrorMsg from '../components/ErrorMsg'
import styles from './sign.module.scss'
import {userSignin, userSignup} from '../slices/user'

export default function Sign() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSignup, setIsSignup] = useState(true)
    const [error, setError] = useState('')

    const changeLogin = (e) => setLogin(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)
    const changeConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const signup = () => {
        dispatch(userSignup({login, password})).then((res) => {
            if (res.error) {
                setError(res.error.message)
                return
            }

            navigate('/app')
        })
    }

    const signin = () => {
        dispatch(userSignin({login, password})).then((res) => {
            if (res.error) {
                setError(res.error.message)
                return
            }

            navigate('/app')
        })
    }

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

                {error && <ErrorMsg message={error} />}
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
