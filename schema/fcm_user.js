/* jshint indent: 2 */

var customDataTypes = require( '../helpers/helper.datatype.timestamp');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fcm_users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },    
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    device_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    device_token: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    device_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    is_deleted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue : 0
    }
  },{
    tableName: 'fcm_users',
    timestamps:true      
  });
};
