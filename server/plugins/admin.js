const Connect = require('connect-pg-simple')
const FastifySession = require('@fastify/session')
const AdminJS = require('adminjs')
const AdminJSFastify = require('@adminjs/fastify')
const AdminJSSequelize = require('@adminjs/sequelize')
const db = require('../models')

module.exports = async function (fastify, opts, done) {
    const ConnectSession = Connect(FastifySession)

    const sessionStore = new ConnectSession({
        conObject: {
            connectionString:
                'postgres://postgres:postgres@localhost:5433/google_keep',
            ssl: process.env.NODE_ENV === 'production',
        },
        tableName: 'admin_session',
        createTableIfMissing: true,
    })

    const DEFAULT_ADMIN = {
        email: 'admin',
        password: '123',
    }

    const authenticate = async (email, password) => {
        if (
            email === DEFAULT_ADMIN.email &&
            password === DEFAULT_ADMIN.password
        ) {
            return Promise.resolve(DEFAULT_ADMIN)
        }
        return null
    }

    const cookieSecret = 'sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5'

    AdminJS.registerAdapter({
        Resource: AdminJSSequelize.Resource,
        Database: AdminJSSequelize.Database,
    })

    const admin = new AdminJS({
        databases: [],
        resources: [db.user, db.task, db.UserTask],
        rootPath: '/admin',
    })

    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: cookieSecret,
            cookieName: 'adminjs',
        },
        fastify,
        {
            store: sessionStore,
            saveUninitialized: true,
            secret: cookieSecret,
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            },
        }
    )

    done()
}
