/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('category_master', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        cat_name_en: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cat_name_ar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false  
        },    
        country_id: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue:1
        },
        cat_image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sort_order: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:1
        },
        cat_createdby: {
          type: DataTypes.INTEGER(11),
          allowNull: true
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue : 0
        }
    }, {
        tableName: 'category_master',
        timestamps:true,
        classMethods: {
          associate: function(models) {
            this.belongsToMany(models.item_master, { 
              through: models.item_cat_rel,
              foreignKey: { 
                allowNull: true, 
                name: 'cat_id',
                otherKey : 'id'
              }
            })
          }
        }       
    });
};
