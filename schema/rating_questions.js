/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rating_question_en: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rating_question_ar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active','Inactive'),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue : 0
    }
  }, {
    tableName: 'roles',
    timestamps:true
  });
};
