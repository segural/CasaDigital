module.exports = (sequelize, dataTypes) => {
    let alias = 'Subtitle';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        ccLang: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
    };
    let config = {
        tableName: 'subtitles',
        timestamps: false
    }
    const Subtitle = sequelize.define(alias, cols, config); 

    Subtitle.associate = function (models) {
    Subtitle.belongsToMany(models.Course, {
        as: 'courses',
        through: 'course_subtitle',
        foreignKey:'id_subtitle',
        otherKey:'id_course',
        timestamps: false,
    })
    }
    return Subtitle
};