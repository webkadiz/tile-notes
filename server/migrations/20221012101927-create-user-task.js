module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserTasks', {
            userId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            taskId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            scope: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserTasks')
    },
}
