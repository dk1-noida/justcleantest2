/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('basket', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false            
        },
        item_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false            
        },   
        service_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false  
        },
        quantity : {
            type: DataTypes.INTEGER(11),
            allowNull: false  
        },     
        unit_price : {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.000
        },
        is_deleted: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue : 0
        }
    },{
    tableName: 'basket',
    timestamps:true      
  });
};
