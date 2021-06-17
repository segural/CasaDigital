module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        subcategory_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        subcategory_img: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    };
    let config = {
        tableName: 'subcategories',
        timestamps: false
    }
    const Subcategory = sequelize.define(alias, cols, config); 

    Subcategory.associate = function (models) {
        Subcategory.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'id_category',
        })
    }

    return Subcategory
};