'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sharings', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            taskId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            link: {
                type: Sequelize.STRING,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sharings')
    },
}
