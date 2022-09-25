const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            // define association here
        }
    }

    Task.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.STRING,
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
