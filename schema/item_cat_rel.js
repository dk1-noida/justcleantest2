/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('item_cat_rel', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        cat_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue : 0
        }
    }, {
        tableName: 'item_cat_rel',
        timestamps:true        
    });
};
