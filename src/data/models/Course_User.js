module.exports = (sequelize, dataTypes) => {
    let alias = 'course_user';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        course_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        rating: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        
    };
    let config = {
        tableName: 'course_user',
        timestamps: false
    }
    const course_user = sequelize.define(alias, cols, config); 


    return course_user
};