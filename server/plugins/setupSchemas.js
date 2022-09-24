const baseResponse = {
    $id: 'baseResponse',
    response: {
        200: {
            type: 'object',
            properties: {
                error: {type: 'boolean'},
                message: {type: 'string'},
            },
        },
    },
}

module.exports = function (fastify, opts, done) {
    fastify.addSchema(baseResponse)
    fastify.addSchema(require('../schemas/task').taskSchema)

    done()
}
