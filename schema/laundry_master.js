/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laundry_master', {
    id : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    laundry_code : {
      type : DataTypes.STRING(15),
      allowNull : false
    },
    laundry_name_en : {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    laundry_name_ar : {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    country_id : {
      type: DataTypes.INTEGER(4),
      allowNull:false
    },
    owner_name : {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    mobile : {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    alt_mobile : {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue:0
    },
    email_id : {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    area_id : {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    laundry_logo : {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    contract_start_date : {
      type: DataTypes.DATE,
      allowNull: false
    },
    contract_end_date : {
      type: DataTypes.DATE,
      allowNull: false
    },
    address : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_deleted : {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'laundry_master',
    timestamps:true,
    classMethods: {
      associate: function(models) {
        
        this.hasMany(models.laundry_branch, { 
          foreignKey: { 
            allowNull: true, 
            name: 'laundry_id',
            targetKey : 'id'
          }
        }),

        this.hasMany(models.laundry_legal_docs, { 
          foreignKey: { 
            allowNull: true, 
            name: 'laundry_id',
            targetKey : 'id'
          }
        })

      }
    }
  });
};