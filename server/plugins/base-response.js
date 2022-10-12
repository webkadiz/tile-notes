module.exports = function (fastify, opts, done) {
    fastify.decorateReply('baseResponse', function (payload) {
        this.headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        })

        if (payload instanceof Error) {
            this.send({
                error: true,
                message: payload.message,
            })

            return
        }

        this.send({
            error: false,
            message: '',
            data: payload,
        })
    })

    done()
}
