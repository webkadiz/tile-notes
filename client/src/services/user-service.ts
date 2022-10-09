import * as api from '../api'

class UserService {
    async isAuth() {
        try {
            const res = await api.isAuth()

            if (res.data.error) throw new Error('not auth')
        } catch(e) {
            throw e
        }
    }
}

export default new UserService()

