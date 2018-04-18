/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_knet', {
    id: {
      type:  DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PaymentID: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TransactionID: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    ReferenceID: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    TrackID: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Authentication: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Result: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PostDate: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PaidDate: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PaymentStatusID: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    udf1: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    udf2: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    udf3: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    udf4: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    udf5: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'payment_knet'
  });
};