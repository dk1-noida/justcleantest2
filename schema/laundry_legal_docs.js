/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laundry_legal_docs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    laundry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false      
    },
    doc_name:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    doc_type:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    doc_url:{
      type: DataTypes.STRING(200),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue : 0
    }
  }, {
    tableName: 'laundry_legal_docs',
    timestamps:true    
  });
};