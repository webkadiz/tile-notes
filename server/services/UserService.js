const db = require('../models')

class UserService {
    async signup(params) {
        try {
            const existingUser = await db.user.findAll({
                where: {
                    login: params.login,
                },
            })

            if (existingUser.length) throw new Error('Пользователь существует')

            return (await db.user.create(params)).dataValues
        } catch (e) {
            return e
        }
    }

    async signin(params) {
        try {
            const existingUser = await db.user.findAll({
                where: {
                    login: params.login,
                },
            })

            if (!existingUser.length) throw new Error('Пользователя не существует')

            return existingUser[0]
        } catch (e) {
            return e
        }
    }
}

module.exports = new UserService()
