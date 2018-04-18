/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ratings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
    },
    order_id: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
    },
    laundry_id: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
    },
    submission_Date: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
    },
    rating_status: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
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
    tableName: 'ratings',
    timestamps:true
  });
};
