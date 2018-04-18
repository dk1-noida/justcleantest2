/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_log', {
    audit_log_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    request_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER(11)
    },
    method: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    endpoint: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    headers: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    params: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'audit_log',
    timestamps:true
  });
};
