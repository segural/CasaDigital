module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        // category_img: {
        //     type: dataTypes.STRING(50),
        //     allowNull: false
        // },
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function (models){
        Category.hasMany(models.Subcategory,{
            as: 'subcategory',
            foreignKey: 'id_category',
        })
        Category.hasMany(models.Course,{
            as: 'course',
            foreignKey: 'category_id',
        })
    }

    return Category
};