/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('areas', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name_en: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name_ar: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },        
        governorate_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        status: {
          type: DataTypes.ENUM('active','inactive'),
          allowNull: false
        },  
        is_deleted: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue : 0
        }
    },{
    tableName: 'areas',
    timestamps:true,
    classMethods: {
            associate : function(models) {
            this.belongsTo(models.governorates, { 
              foreignKey : { 
                allowNull : true, 
                name : 'governet_id',
                targetKey : 'id'
              }
            }),
            this.hasMany(models.addresses, { 
              foreignKey : { 
                allowNull : true, 
                name : 'area_id',
                targetKey : 'id'
              }
            })
          }
        }       
  });
};
