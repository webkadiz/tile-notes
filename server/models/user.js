const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            login: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user',
        }
    )

    return User
}
