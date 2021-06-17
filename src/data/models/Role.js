module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
    };
    let config = {
        tableName: 'roles',
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config); 

    Role.associate = function (models){
        Role.hasMany(models.User,{
            as: 'user',
            foreignKey: 'role_id',
        })
    }

    return Role
};