module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
            },
            content: {
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
        await queryInterface.dropTable('tasks')
    },
}
