const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_status extends Model {
    static associate(models) {
      this.hasMany(models.ticket);
    }
  }
  Ticket_status.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_status",
      underscored: true,
    }
  );
  return Ticket_status;
};
