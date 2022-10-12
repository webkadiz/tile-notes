const db = require('../models')

class UserService {
    async get(userId) {
        return db.user.findByPk(userId)
    }

    async signup(params) {
        const existingUser = await db.user.findAll({
            where: {
                login: params.login,
            },
        })

        if (existingUser.length) throw new Error('Пользователь существует')

        return (await db.user.create(params)).dataValues
    }

    async signin(params) {
        const existingUser = await db.user.findAll({
            where: {
                login: params.login,
            },
        })

        if (!existingUser.length) throw new Error('Пользователя не существует')

        if (params.password !== existingUser[0].password)
            throw new Error('Логин или пароль неверны')

        return existingUser[0]
    }
}

module.exports = new UserService()
