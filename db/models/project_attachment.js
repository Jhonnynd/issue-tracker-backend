const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project_attachment extends Model {
    static associate(models) {
      this.belongsTo(models.project);
    }
  }
  Project_attachment.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "project_attachment",
      underscored: true,
    }
  );
  return Project_attachment;
};
