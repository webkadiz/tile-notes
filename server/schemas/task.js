module.exports.taskSchema = {
    $id: 'task',
    type: 'object',
    properties: {
        id: {type: 'string'},
        title: {type: 'string'},
        content: {type: 'string'},
        isDeleted: {type: 'boolean'},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'},
        coauthors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {type: 'string'},
                    login: {type: 'string'},
                    scope: {type: 'string'},
                },
            },
        },
    },
}

module.exports.getTaskSchema = {
    headers: {
        type: 'object',
        properties: {
            authorization: {type: 'string'},
        },
        required: ['authorization'],
    },
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
            id: {$ref: 'task#/properties/id'},
            title: {$ref: 'task#/properties/title'},
            content: {$ref: 'task#/properties/content'},
            createdAt: {$ref: 'task#/properties/createdAt'},
            updatedAt: {$ref: 'task#/properties/updatedAt'},
        },
        required: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                error: {$ref: 'baseResponse#/response/200/properties/error'},
                message: {
                    $ref: 'baseResponse#/response/200/properties/message',
                },
                data: {
                    $ref: 'task#',
                },
            },
        },
    },
}

module.exports.putTaskSchema = {
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
            id: {$ref: 'task#/properties/id'},
            title: {$ref: 'task#/properties/title'},
            content: {$ref: 'task#/properties/content'},
            updatedAt: {$ref: 'task#/properties/updatedAt'},
        },
        required: ['id'],
        additionalProperties: false,
    },
    $ref: 'baseResponse#',
}

module.exports.deleteTaskSchema = {
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
            id: {$ref: 'task#/properties/id'},
        },
        required: ['id'],
        additionalProperties: false,
    },
    $ref: 'baseResponse#',
}
