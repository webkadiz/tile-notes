import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import UserService from '../services/user-service'

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        UserService.isAuth()
            .then(() => navigate('/app'))
            .catch(() => navigate('/sign'))
    }, [])

    return null
}
