/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('compensations', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        order_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER(4),
            allowNull: false            
        },   
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        note: {
          type: DataTypes.INTEGER(11),
          allowNull: false,   
          defaultValue: '0'      
        },
        cost_cover_type: {
          type: DataTypes.INTEGER(11),
          allowNull: false,   
          defaultValue: '0'      
        },
        laundry_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,   
          defaultValue: '0'      
        },
        justclean: {
          type: DataTypes.INTEGER(11),
          allowNull: false,   
          defaultValue: '0'      
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue : 0
        },
        status:{
            type: DataTypes.ENUM('Active','Inactive'),
            allowNull: false,
            defaultValue: 'Active'
        }
    }, {
        tableName: 'compensations',
        timestamps:true      
    });
};
