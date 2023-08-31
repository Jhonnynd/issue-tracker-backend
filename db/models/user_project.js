"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_project extends Model {
    static associate(models) {
      this.belongsTo(models.project);
      this.belongsTo(models.user);
    }
  }
  User_project.init(
    {},
    {
      sequelize,
      modelName: "user_project",
      underscored: true,
    }
  );
  return User_project;
};
