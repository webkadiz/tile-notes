module.exports.taskSchema = {
    $id: 'task',
    type: 'object',
    properties: {
        id: {type: 'string'},
        title: {type: 'string'},
        content: {type: 'string'},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'},
    },
}

module.exports.getTaskSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                error: {$ref: 'baseResponse#/response/200/properties/error'},
                message: {
                    $ref: 'baseResponse#/response/200/properties/message',
                },
                data: {
                    type: 'array',
                    items: {$ref: 'task#'},
                },
            },
        },
    },
}

module.exports.postTaskSchema = {
    body: {
        type: 'object',
        properties: {
            title: {$ref: 'task#/properties/title'},
            content: {$ref: 'task#/properties/content'},
        },
        required: ['title', 'content'],
    },
    $ref: 'baseResponse#',
}

module.exports.putTaskSchema = {
    body: {
        type: 'object',
        properties: {
            id: {$ref: 'task#/properties/id'},
            title: {$ref: 'task#/properties/title'},
            content: {$ref: 'task#/properties/content'},
        },
        required: ['id', 'title', 'content'],
    },
    $ref: 'baseResponse#',
}

module.exports.deleteTaskSchema = {
    body: {
        type: 'object',
        properties: {
            id: {$ref: 'task#/properties/id'},
        },
        required: ['id', 'content'],
    },
    $ref: 'baseResponse#',
}
