const TaskService = require('../services/TaskService')
const {
    getTaskSchema,
    postTaskSchema,
    putTaskSchema,
    deleteTaskSchema,
} = require('../schemas/task')

module.exports = function (fastify, opts, done) {
    fastify.get('/task', {schema: getTaskSchema}, (request, reply) => {
        const res = TaskService.create(taskParams)
        reply.send()
    })

    fastify.post('/task', {schema: postTaskSchema}, (request, reply) => {
        console.log(request.body)

        // const res = TaskService.create(taskParams)
        reply.send()
    })

    fastify.put('/task', {schema: putTaskSchema}, (request, reply) => {
        reply.send()
    })

    fastify.delete('/task', {schema: deleteTaskSchema}, (request, reply) => {
        reply.send()
    })

    done()
}
