module.exports = function (fastify, opts, done) {
    fastify.decorate('authenticate', async function (request, reply) {
            // console.log(reply)
            console.log(request.jwtVerify)
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    done()
}
