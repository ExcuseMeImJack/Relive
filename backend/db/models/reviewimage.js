'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {foreignKey: 'reviewId'});
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reviews'
      },
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
