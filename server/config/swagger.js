module.exports = {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: ' swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0',
        },
        host: 'localhost:4000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
}
