module.exports.addCoauthorSchema = {
    headers: {
        type: 'object',
        properties: {
            authorization: {type: 'string'},
        },
        required: ['authorization'],
    },
    body: {
        type: 'object',
        properties: {
            taskId: {type: 'string'},
            login: {type: 'string'},
        },
        required: ['taskId', 'login'],
        additionalProperties: false,
    },
}
