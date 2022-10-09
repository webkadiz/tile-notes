module.exports = function (fastify, opts, done) {
    fastify.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    done()
}
