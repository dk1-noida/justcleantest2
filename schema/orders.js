/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_unique_id: {
            type: DataTypes.STRING(20),
            allowNull: false,            
        },
        laundry_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false            
        },   
        user_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false  
        },
        basket_type_id : {
            type: DataTypes.INTEGER(11),
            allowNull: false  
        },     
        total_no_of_items: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        order_bill_amount: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.000
        },        
        actual_bill_Amount: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.000
        },
        payment_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        jccredit_Amount: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.000
        },
        extra_charges: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.000
        },
        extra_discounts: {
            type: DataTypes.STRING(50),
            allowNull: true,            
        },
        order_pickup_date: {
            type: DataTypes.DATE(6),  
            allowNull: true,            
        },
        order_pickup_timeslot_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,   
            defaultValue: 0
        },
        order_delivery_date: {
            type: DataTypes.DATE(6),
            allowNull: true            
        },
        order_delivery_timeslot_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: 0
        },
        scheduled_delivery: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        order_status: {
            type: DataTypes.INTEGER(3),
            allowNull: false
            //defaultValue : 0
        },
        status_change_datetime : {
            type: DataTypes.DATE(6),
            allowNull: true  
        },
        order_date : {
            type: DataTypes.DATE(6),
            allowNull: true
        },
        special_instruction : {
            type: DataTypes.TEXT,
            allowNull: true, 
        }

    },{
        tableName: 'orders',
        timestamps:true,
        classMethods : {
          associate : function(models) {
            this.hasMany(models.basket, { 
              foreignKey : { 
                allowNull : true, 
                name : 'order_id',
                targetKey : 'id'
              }
            }),
            this.hasMany(models.payment_knet, { 
              foreignKey : { 
                allowNull : true, 
                name : 'Order_id',
                targetKey : 'id'
              }
            }),
            this.belongsTo(models.users, {
                foreignKey: {
                    allowNull: true,
                    name: 'user_id',
                    targetKey: 'id'
                }
            }),this.hasOne(models.status, {
                  foreignKey : {
                      allowNull : true,
                      name : 'status_id',
                      targetKey : 'order_status'
                  }
              }),this.belongsTo(models.laundry_branch, {
                  foreignKey: {
                      allowNull: true,
                      name: 'laundry_id',
                      targetKey: 'id'
                  }
              })
          }
        }
    })
};
