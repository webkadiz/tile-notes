const taskService = require('../services/TaskService')
const {
    getTaskSchema,
    postTaskSchema,
    putTaskSchema,
    deleteTaskSchema,
    postAddSharingLink,
} = require('../schemas/task')

module.exports = function (fastify, opts, done) {
    fastify.options('/task', (request, reply) => {
        reply.baseResponse()
    })

    fastify.get('/task/:link', {}, async (request, reply) => {
        const res = await taskService.getSharingTask(request.params.link)

        reply.baseResponse(res)
    })

    fastify.get(
        '/task',
        {schema: getTaskSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.get(request.user.id)

            reply.baseResponse(res)
        }
    )

    fastify.post(
        '/task',
        {schema: postTaskSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.create(request.user.id, request.body)

            reply.baseResponse(res)
        }
    )

    fastify.put(
        '/task',
        {schema: putTaskSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.update(request.user.id, request.body)

            reply.baseResponse(res)
        }
    )

    fastify.delete(
        '/task',
        {schema: deleteTaskSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.delete(
                request.user.id,
                request.body.id
            )

            reply.baseResponse(res)
        }
    )

    fastify.post(
        '/task/sharing',
        {schema: postAddSharingLink, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.addSharingLink(request.body)

            reply.baseResponse(res)
        }
    )

    done()
}
