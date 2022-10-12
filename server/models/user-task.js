const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class UserTask extends Model {
        static associate(models) {
            // define association here
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
