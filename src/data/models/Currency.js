module.exports = (sequelize, dataTypes) => {
    let alias = 'Currency';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        currency: {
            type: dataTypes.STRING(3),
            allowNull: false
        },
    };
    let config = {
        tableName: 'currencies',
        timestamps: false
    }
    const Currency = sequelize.define(alias, cols, config); 

    Currency.associate = function (models) {
        Currency.hasMany(models.Course,{
            as: 'course',
            foreignKey: 'currency_id',
        })
    }

    return Currency
};