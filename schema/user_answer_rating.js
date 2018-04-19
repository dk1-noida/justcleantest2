/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rating_answer_rating', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,      
    },
    rating_question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,      
    },
    user_rating_answer: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_rating_review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active','Inactive'),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue : 0
    }
  }, {
    tableName: 'rating_answer_rating',
    timestamps:true
  });
};
