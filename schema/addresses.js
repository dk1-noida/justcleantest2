/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
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
    address_type: {
      type: DataTypes.ENUM('primary','secondary'),
      allowNull: false
    },
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    governorate_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    block: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    avenue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    house_no: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    building: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    floor: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },   
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue : 0
    }
  }, {
    tableName: 'addresses',
    timestamps:true,
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.areas,{
                foreignKey: {
                    allowNull : true,
                    name : 'area_id',
                    targetKey: 'id'
                    }
                }),
            this.belongsTo(models.governorates, { 
                foreignKey : { 
                  allowNull : true, 
                  name : 'governorate_id',
                  targetKey : 'id'
                }
              }),
            this.belongsTo(models.countries, { 
                foreignKey : { 
                  allowNull : true, 
                  name : 'country_id',
                  targetKey : 'id'
                }
              })
            }
            
      }  
        
  });
};
