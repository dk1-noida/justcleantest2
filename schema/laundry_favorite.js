/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('laundry_favorite', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        laundry_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },       
        is_deleted: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue : 0
        }
    },{
    tableName: 'laundry_favorite',
    timestamps:true       
  });
};
