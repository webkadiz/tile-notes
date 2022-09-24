module.exports = function (fastify, opts, done) {
    fastify.setErrorHandler(function (error, request, reply) {
        reply.baseResponse(error)
    })

    done()
}
