const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.projects_attachment);
      this.hasMany(models.ticket);
      this.belongsToMany(models.user, {
        through: "user_project",
        foreignKey: "project_id",
      });
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "project",
      underscored: true,
    }
  );
  return Project;
};
