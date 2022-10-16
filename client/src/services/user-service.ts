class UserService {
    isAuth() {
        return localStorage.getItem('token')
    }
}

export default new UserService()

