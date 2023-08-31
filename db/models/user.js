const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.user_role);
      this.hasMany(models.project);
      // this.hasMany(models.ticket_comment);
      this.hasMany(models.ticket, {
        as: "assigned_user",
        foreignKey: "assigned_user_id",
      });
      this.hasMany(models.ticket, {
        as: "submitter",
        foreignKey: "submitter_id",
      });
      this.belongsToMany(models.project, {
        through: "user_project",
        foreignKey: "user_id",
      });
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
