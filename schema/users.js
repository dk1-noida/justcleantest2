/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: true,            
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: true            
        },        
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },        
        image_path: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_status: {
            type: DataTypes.ENUM('Active','Inactive'),
            allowNull: false,
            defaultValue: 'Active'
        },
        user_type: {
            type: DataTypes.ENUM('user','guest'),
            allowNull: true,            
        },
        language_id: {
            type: DataTypes.INTEGER(4),
            allowNull: false,            
        },
        email_confirmation: {
            type: DataTypes.ENUM('true','false'),
            allowNull: false,
            defaultValue: 'false'
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        giftcard_balance_amount: {
            type: DataTypes.DECIMAL(0,3),
            allowNull: true,
            defaultValue : 0.00
        },
        jccredit_balance_amount: {
            type: DataTypes.DECIMAL(0,3),
            allowNull: true,
            defaultValue : 0.00
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true  
        },
        oauthID: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        loged_from: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_verified: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue : 0  
        },
        link_generate_time : {
            type: DataTypes.TEXT,
            allowNull: true  
        }
    },{
        tableName : 'users',
        timestamps : true,
        classMethods : {
          associate : function(models) {
            this.hasMany(models.addresses, { 
              foreignKey : { 
                allowNull : true, 
                name : 'user_id',
                targetKey : 'id'
              }
            }),
            this.hasMany(models.fcm_users, {
                foreignKey : {
                    allowNull : true,
                    name : 'user_id',
                    targetKey : 'id'
                }
            }),
           this.hasMany(models.laundry_favorite, {
              foreignKey : {
                allowNull : true,
                name : 'user_id',
                targetKey : 'id'
              }
            }),
            this.hasMany(models.orders, {
                foreignKey : {
                    allowNull : true,
                    name : 'user_id',
                    targetKey : 'id'
                }
            }),
            this.hasMany(models.customer_tag_details, {
                foreignKey : {
                    allowNull : true,
                    name : 'user_id',
                    targetKey : 'id'
                }
            }),
            this.hasMany(models.user_blocklist, {
                foreignKey : {
                    allowNull : true,
                    name : 'user_id',
                    targetKey : 'id'
                }
            })
          }
    }
    })
};
