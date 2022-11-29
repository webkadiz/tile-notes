const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Sharing extends Model {
        static associate(models) {
            models.sharing.belongsTo(models.task)
        }
    }

    Sharing.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            taskId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            link: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'sharing',
            timestamps: false,
        }
    )

    return Sharing
}
