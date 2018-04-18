/* jshint indent: 2 */


module.exports = function(sequelize, DataTypes) {

  return sequelize.define('countries', {

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
    },
  },
  {
    timestamps : true,
    tableName: 'countries',
    classMethods: {
      associate: function(models) {
        this.hasMany(models.governorates, { 
          foreignKey: { 
            allowNull: true, 
            name: 'country_id',
            targetKey : 'id'
          }
        }),
        this.hasMany(models.addresses, { 
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