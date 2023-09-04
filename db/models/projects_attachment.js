const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects_attachment extends Model {
    static associate(models) {
      this.belongsTo(models.project);
    }
  }
  Projects_attachment.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "projects_attachment",
      underscored: true,
    }
  );
  return Projects_attachment;
};
