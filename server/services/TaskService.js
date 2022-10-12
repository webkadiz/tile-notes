const db = require('../models')
const UserService = require('../services/UserService')

class TaskService {
    async get(userId) {
        const user = await UserService.get(userId)

        return user.getTasks()
    }

    async create(userId, task) {
        const user = await UserService.get(userId)

        return (await user.createTask(task, {
            through: {scope: 'own'},
        })).dataValues
    }

    async update(userId, {id, title, content, updatedAt}) {
        const user = await UserService.get(userId)
        const taskArr = await user.getTasks({where: {id}})

        if (!taskArr.length) throw new Error('task not found')

        const task = taskArr[0]

        await task.update(
            {title, content, updatedAt},
        )
    }

    async delete(userId, id) {
        const user = await UserService.get(userId)
        const taskArr = await user.getTasks({where: {id}})

        if (!taskArr.length) throw new Error('task not found')

        await task.destroy()
    }
}

module.exports = new TaskService()
