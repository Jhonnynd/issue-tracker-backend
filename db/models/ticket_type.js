const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_type extends Model {
    static associate(models) {
      this.hasMany(models.ticket);
    }
  }
  Ticket_type.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_type",
      underscored: true,
    }
  );
  return Ticket_type;
};
