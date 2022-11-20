const taskService = require('../services/TaskService')
const {addCoauthorSchema} = require('../schemas/coauthor')

module.exports = function (fastify, _, done) {
    fastify.options('/coauthor', (_, reply) => {
        reply.baseResponse()
    })

    fastify.post(
        '/coauthor',
        {schema: addCoauthorSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.addCoauthor(request.body)

            reply.baseResponse(res)
        }
    )

    fastify.delete(
        '/coauthor',
        {schema: addCoauthorSchema, onRequest: fastify.authenticate},
        async (request, reply) => {
            const res = await taskService.removeCoauthor(request.body)

            reply.baseResponse(res)
        }
    )

    done()
}
