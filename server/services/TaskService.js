const db = require('../models')
const UserService = require('../services/UserService')

class TaskService {
    async get(userId) {
        const user = await UserService.get(userId)

        const tasks = await user.getTasks()

        for (const task of tasks) {
            const coauthors = await task.getUsers({raw: true})

            task.dataValues.coauthors = coauthors
        }

        return tasks
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
        console.log(userId, id)
        const user = await UserService.get(userId)
        const taskArr = await user.getTasks({where: {id}})

        if (!taskArr.length) throw new Error('task not found')

        const task = taskArr[0]

        await task.destroy()
    }
}

module.exports = new TaskService()
