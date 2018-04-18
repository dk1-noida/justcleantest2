/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laundry_branch', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    branch_code: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    laundry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    branch_name_en: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    branch_name_ar: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    branch_manager_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    email_id: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    no_of_drivers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue : 0
    },
    governorate_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue : 0
    },
    area_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue : 0
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    long: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    spcl_service_type: {
        type: DataTypes.INTEGER(2),
        allowNull: true
    },
    jc_premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    min_order_amount: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false,
        defaultValue:0
    },
    fast_turn_around: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        defaultValue: 0
    },
    normal_turn_around: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        defaultValue:0
    },
    premium_turn_around: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        defaultValue:0
    },
    laundry_rating: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue:0
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: '09:00:00'
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: '21:00:00'
    },
    is_active: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
    },
    is_deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue:0
    }
  }, {
    tableName: 'laundry_branch',
    timestamps:true,
    classMethods: {
      associate: function(models) {        
      }
    }  
  });
};