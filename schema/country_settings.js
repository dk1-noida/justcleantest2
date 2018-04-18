/* jshint indent: 2 */


module.exports = function(sequelize, DataTypes) {

  return sequelize.define('country_settings', {

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,      
    },
    country_en: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country_ar: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    decimal: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue:"0.00"
    },
    isd_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    symbol: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thousand_sep: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency_decimal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accept_order: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
     confirm_order: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    complete_order: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    warning: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
     late: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    urgent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    base_coverage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
     base_capacity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    additional_driver_hour: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    additional_driver_radius: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tax: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
      defaultValue: 0.00
    },    
    parent: {
      type: DataTypes.INTEGER(11),
      allowNull: false,     
      defaultValue: '0'    
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active' 
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue : 0
    },
  },
  {
    timestamps : true,
    tableName: 'country_settings',
  });

};
