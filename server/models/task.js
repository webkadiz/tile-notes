const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            models.task.belongsToMany(models.user, {through: models.UserTask})
            models.task.hasMany(models.UserTask)
        }
    }

    Task.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            content: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'task',
            timestamps: false,
        }
    )

    return Task
}
