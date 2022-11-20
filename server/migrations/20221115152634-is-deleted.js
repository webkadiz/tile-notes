module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn('tasks', 'isDeleted', {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        })
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('tasks', 'isDeleted')
    },
}
