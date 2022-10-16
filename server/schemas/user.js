module.exports.isAuthSchema = {
    headers: {
        type: 'object',
        properties: {
            authorization: {type: 'string'},
        },
        required: ['authorization'],
    },
    $ref: 'baseResponse#',
}

module.exports.signupSchema = {
    body: {
        type: 'object',
        properties: {
            login: {type: 'string'},
            password: {type: 'string'},
        },
        required: ['login', 'password'],
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
                    type: 'object',
                    properties: {
                        token: {type: 'string'},
                        userInfo: {
                            type: 'object',
                            properties: {
                                login: {type: 'string'},
                            },
                        },
                    },
                },
            },
        },
    },
}

module.exports.signinSchema = {
    body: {
        type: 'object',
        properties: {
            login: {type: 'string'},
            password: {type: 'string'},
        },
        required: ['login', 'password'],
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
                    type: 'object',
                    properties: {
                        token: {type: 'string'},
                        userInfo: {
                            type: 'object',
                            properties: {
                                login: {type: 'string'},
                            },
                        },
                    },
                },
            },
        },
    },
}
