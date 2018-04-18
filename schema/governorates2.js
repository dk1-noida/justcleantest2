/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('governorates', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },   
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    language_id: {
      type: DataTypes.INTEGER(3),
      allowNull: true,      
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    country_id: {
        type: DataTypes.INTEGER(5),
        allowNull: true
    },
    parent: {
      type: DataTypes.INTEGER(11),
      allowNull: false,      
      defaultValue : 0
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue : 0
    }   
  },
   {
      tableName: 'governorates',
      timestamps:true,
      classMethods: {
        associate : function(models) {
            this.belongsTo(models.countries, { 
              foreignKey : { 
                allowNull : true, 
                name : 'country_id',
                targetKey : 'id'
              }
            }),
            this.hasMany(models.areas, { 
              foreignKey : { 
                allowNull : true, 
                name : 'id',
                targetKey : 'governet_id'
              }
            })
          }
        }
      });
};
