/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('blocklist_master', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'blocklist_master',
        timestamps:true
    });
};
