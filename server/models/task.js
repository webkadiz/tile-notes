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
        },
        {
            sequelize,
            modelName: 'task',
        }
    )

    return task
}
