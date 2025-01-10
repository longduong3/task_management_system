'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attachment.init({
    task_id: DataTypes.INTEGER,
    file_url: DataTypes.STRING,
    uploaded_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Attachment',
  });
  return Attachment;
};