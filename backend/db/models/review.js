'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {foreignKey: 'userId'});

      Review.belongsTo(models.Spot, {foreignKey: 'spotId'});

      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId'})
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
