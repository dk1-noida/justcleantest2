/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('customer_tag_details', {
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
        tag_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'customer_tag_details',
        timestamps:false,
        classMethods : {
            associate : function(models) {
                this.belongsTo(models.users, {
                    foreignKey : {
                        allowNull : true,
                        name : 'user_id',
                        targetKey : 'id'
                    }
                }),
                    this.belongsTo(models.tag_master, {
                        foreignKey : {
                            allowNull : true,
                            name : 'tag_id',
                            targetKey : 'id'
                        }
                    })
            }
        }
    });
};