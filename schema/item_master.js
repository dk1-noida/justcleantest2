/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item_master', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    item_name_en: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    item_name_ar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    item_image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alt_tag: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    item_seo_image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    item_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    item_status: {
      type: DataTypes.ENUM('Active','Inactive'),
      allowNull: false,
      defaultValue:'Active'
    },    
    item_createdby: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_taxable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : false
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue : 0
    }
  }, {
    tableName: 'item_master',
    timestamps : true,
    classMethods: {
          associate: function(models) {
            this.belongsToMany(models.category_master, { 
              through: models.item_cat_rel,
              foreignKey: { 
                allowNull: true, 
                name: 'item_id',
                targetKey : 'id'
              }
            })            
          }
        }   
  });
};
