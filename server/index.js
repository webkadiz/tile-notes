require('dotenv').config()

const fastify = require('fastify')({
    logger: false,
})
const fp = require('fastify-plugin')
const swaggerConfig = require('./config/swagger')

fastify.register(require('@fastify/swagger'), swaggerConfig)
fastify.register(fp(require('./plugins/base-response')))
fastify.register(fp(require('./plugins/setup-schemas')))
fastify.register(fp(require('./plugins/error-handler')))
fastify.register(require('./routes/task'), {prefix: '/api'})

fastify.listen({port: process.env.PORT}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(-1)
    }

    console.log('Server listening...')
})
