const db = require('../models')

class TaskService {
    async get() {
        try {
            return await db.task.findAll()
        } catch (e) {
            return e
        }
    }

    async create(params) {
        try {
            return (await db.task.create(params)).dataValues
        } catch (e) {
            return e
        }
    }

    async update({id, title, content}) {
        try {
            const res = await db.task.update(
                {title, content},
                {
                    where: {id},
                }
            )

            if (res[0] === 0) throw new Error('task not found')
        } catch (e) {
            return e
        }
    }

    async delete(id) {
        try {
            const res = await db.task.destroy({
                where: {id},
            })

            if (res === 0) throw new Error('task not found')
        } catch (e) {
            return e
        }
    }
}

module.exports = new TaskService()
