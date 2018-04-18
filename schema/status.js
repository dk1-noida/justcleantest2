/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status', {
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_flag: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    laundry_man_flag: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    status_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_class: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    status_createdby: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },    
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'status',
    timestamps:true/*,
    classMethods : {
        associate : function(models) {
            this.hasMany(models.orders, {
                foreignKey : {
                    allowNull : true,
                    name : 'order_status',
                    targetKey : 'status_id'
                }
            })
        }
    }*/
  });
};
