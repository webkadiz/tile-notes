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

        const token = fastify.jwt.sign({id: user.id, login: user.login})

        reply.baseResponse({token, userInfo: user})
    })

    fastify.post('/signin', {schema: signupSchema}, async (request, reply) => {
        const user = await UserService.signin(request.body)

        const token = fastify.jwt.sign({id: user.id, login: user.login})

        reply.baseResponse({token, userInfo: user})
    })

    done()
}
