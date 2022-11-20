const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class UserTask extends Model {
        static associate(models) {
            models.UserTask.belongsTo(models.task)
            models.UserTask.belongsTo(models.user)
        }
    }

    UserTask.init(
        {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            taskId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            scope: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'UserTask',
        }
    )

    return UserTask
}
