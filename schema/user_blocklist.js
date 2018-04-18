/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_blocklist', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        block_master_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        note: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Active','Inactive'),
            allowNull: false,
            defaultValue: 'Active'
        },
    }, {
        tableName: 'user_blocklist',
        timestamps:true,
        classMethods : {
            associate : function(models) {
                this.belongsTo(models.users, {
                    foreignKey : {
                        allowNull : true,
                        name : 'user_id',
                        targetKey : 'id'
                    }
                }),
                    this.belongsTo(models.blocklist_master, {
                        foreignKey : {
                            allowNull : true,
                            name : 'block_master_id',
                            targetKey : 'id'
                        }
                    })
            }
        }
    });
};
