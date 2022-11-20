require('dotenv').config()

const fastify = require('fastify')({
    logger: false,
})
const fastifyCors = require('@fastify/cors')
const fastifyIO = require('fastify-socket.io')
const fp = require('fastify-plugin')
const swaggerConfig = require('./config/swagger')

const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    },
    // ...
})
const db = require('./models')

io.on('connection', async (socket) => {
    const login = socket.handshake.query.login
    const user = await db.user.findOne({where: {login}})
    const tasks = await user.getTasks()

    for (const task of tasks) {
        socket.join(login)
        socket.join(task.id.toString())
    }

    socket.on('taskChanging', async ({taskId}) => {
        socket.join(taskId)
        console.log(io.to(taskId).emit('update'))
        console.log('task changing', taskId)
    })

    socket.on('removeCoauthor', async ({taskId, login}) => {
        try {
            const coauthor = (await io.in(login).fetchSockets())[0]
            coauthor.leave(taskId)
            io.to(taskId).emit('update')
        } catch (e) {}
    })

    socket.on('addCoauthor', async ({taskId, login}) => {
        try {
            const coauthor = (await io.in(login).fetchSockets())[0]
            coauthor.join(taskId)
            io.to(taskId).emit('update')
        } catch (e) {}
    })
})

httpServer.listen(4001)

fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})
// fastify.register(fastifyIO)
fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret',
})
fastify.register(require('@fastify/swagger'), swaggerConfig)
fastify.register(fp(require('./plugins/base-response')))
fastify.register(fp(require('./plugins/setup-schemas')))
fastify.register(fp(require('./plugins/error-handler')))
fastify.register(fp(require('./plugins/auth')))
fastify.register(fp(require('./plugins/admin')))
fastify.register(require('./routes/task'), {prefix: '/api'})
fastify.register(require('./routes/user'), {prefix: '/api'})
fastify.register(require('./routes/coauthor'), {prefix: '/api'})

fastify.listen({port: process.env.PORT}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(-1)
    }

    console.log('Server listening...')
})

// fastify.ready().then(() => {
//     console.log('ready')
//     fastify.io.on('connection', (socket) => {
//         console.log('connection', socket)
//     })
// })
