const db = require('../models')
const UserService = require('../services/UserService')

class TaskService {
    async get(userId) {
        const user = await UserService.get(userId)

        const tasks = await user.getTasks()

        for (const task of tasks) {
            const finalCoauthors = []
            const coauthors = await task.getUsers({attributes: ['login']})

            for (const coauthor of coauthors) {
                const scope = coauthor.UserTask.scope
                coauthor.dataValues.scope = scope
                finalCoauthors.push(coauthor)
            }

            task.dataValues.coauthors = finalCoauthors
        }

        return tasks
    }

    async create(userId, task) {
        const user = await UserService.get(userId)

        return (
            await user.createTask(task, {
                through: {scope: 'own'},
            })
        ).dataValues
    }

    async update(userId, {id, title, content, updatedAt}) {
        const user = await UserService.get(userId)
        const taskArr = await user.getTasks({where: {id}})

        if (!taskArr.length) throw new Error('task not found')

        const task = taskArr[0]

        await task.update({title, content, updatedAt})
    }

    async delete(userId, id) {
        const user = await UserService.get(userId)
        const taskArr = await user.getTasks({where: {id}})

        if (!taskArr.length) throw new Error('task not found')

        const task = taskArr[0]

        await task.update({
            isDeleted: true,
            updatedAt: new Date().toISOString(),
        })
    }

    async addCoauthor({taskId, login}) {
        const task = await db.task.findByPk(taskId)
        const user = await db.user.findOne({
            where: {
                login,
            },
        })

        console.log(task)
        console.log(user)
        if (!user) throw new Error('Пользователь не найден')

        const res = await task.addUser(user, {through: {scope: 'editor'}})
        console.log(res)
    }

    async removeCoauthor({taskId, login}) {
        const task = await db.task.findByPk(taskId)
        const user = await db.user.findOne({
            where: {
                login,
            },
        })

        if (!user) throw new Error('Пользователь не найден')

        await task.removeUser(user)
    }

    async addSharingLink({taskId, link}) {
        await db.sharing.create({
            taskId,
            link,
        })
    }

    async getSharingTask(link) {
        const {taskId} = await db.sharing.findOne({
            where: {link},
        })

        const task = await db.task.findByPk(taskId)

        return task.dataValues
    }
}

module.exports = new TaskService()
