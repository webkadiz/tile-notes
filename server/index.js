require('dotenv').config()

const fastify = require('fastify')({
    logger: false,
})
const fp = require('fastify-plugin')
const swaggerConfig = require('./config/swagger')

fastify.register(require('@fastify/swagger'), swaggerConfig)
fastify.register(fp(require('./plugins/setupSchemas')))
fastify.register(require('./routes/task'))

fastify.listen({port: process.env.PORT}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(-1)
    }

    console.log('Server listening...')
})
