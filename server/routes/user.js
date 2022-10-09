const UserService = require('../services/UserService')
const {isAuthSchema, signupSchema} = require('../schemas/user')

module.exports = function (fastify, opts, done) {
    fastify.options('*', (request, reply) => {
        reply.baseResponse()
    })

    fastify.get(
        '/is-auth',
        {schema: isAuthSchema, onRequest: fastify.authenticate},
        (request, reply) => {
            reply.baseResponse()
        }
    )

    fastify.post('/signup', {schema: signupSchema}, async (request, reply) => {
        const user = await UserService.signup(request.body)

        if (user instanceof Error) return reply.baseResponse(user)

        const token = fastify.jwt.sign({login: user.login})

        reply.baseResponse({token})
    })

    fastify.post('/signin', {schema: signupSchema}, async (request, reply) => {
        const user = await UserService.signin(request.body)

        if (user instanceof Error) return reply.baseResponse(user)

        console.log(user)

        const token = fastify.jwt.sign({login: user.login})

        reply.baseResponse({token})
    })

    done()
}
