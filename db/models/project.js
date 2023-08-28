const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      // this.belongsTo(models.project_attachment);
      // this.hasMany(models.ticket);
      // this.belongsToMany(models.users, { through: user_projects }); // user_projects
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
