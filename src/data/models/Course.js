module.exports = (sequelize, dataTypes) => {
    let alias = 'Course';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        creation_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        course_title: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        short_description: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        long_description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        requirements: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        who_can: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        top_seller: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        course_owner: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        audio_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        currency_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        video: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
    };
    let config = {
        tableName: 'courses',
        timestamps: false
    }
    const Course = sequelize.define(alias, cols, config); 

    Course.associate = function (models) {
        Course.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'category_id',
        }) 
        Course.belongsTo(models.Audio,{
            as: 'audio',
            foreignKey: 'audio_id',
        }) 
        Course.belongsTo(models.Currency,{
            as: 'currency',
            foreignKey: 'currency_id',
        })
        Course.belongsToMany(models.Subtitle, {
            as: 'subtitles',
            through: 'course_subtitle',
            foreignKey:'id_course',
            otherKey:'id_subtitle',
            timestamps: false,
        })
        Course.belongsToMany(models.User, {
            as: 'users',
            through: 'course_user',
            foreignKey:'course_id',
            otherKey:'user_id',
            timestamps: false,
        })
    }

    return Course
};