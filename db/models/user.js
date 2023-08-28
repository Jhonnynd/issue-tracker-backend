const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.user_role);
      this.hasMany(models.project);
      // this.hasMany(models.ticket_comment);
      // this.hasMany(models.ticket); // as
      // this.hasMany(models.ticket); // as
      // this.belongsToMany(models.projects, { through: user_projects }); // user_projects
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
