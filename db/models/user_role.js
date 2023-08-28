const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    static associate(models) {
      this.hasMany(models.user);
    }
  }
  User_role.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_role",
      underscored: true,
    }
  );
  return User_role;
};
