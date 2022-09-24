module.exports = function (fastify, opts, done) {
    fastify.decorateReply('baseResponse', function (payload) {
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
