module.exports = (sequelize, dataTypes) => {
    let alias = 'Audio';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        audioLang: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
    };
    let config = {
        tableName: 'audio',
        timestamps: false
    }
    const Audio = sequelize.define(alias, cols, config); 

    Audio.associate = function (models) {
        Audio.hasMany(models.Course,{
            as: 'course',
            foreignKey: 'audio_id',
        })
    }
    return Audio
};