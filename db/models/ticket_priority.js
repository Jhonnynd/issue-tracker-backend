const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_priority extends Model {
    static associate(models) {
      this.hasMany(models.ticket);
    }
  }
  Ticket_priority.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_priority",
      underscored: true,
    }
  );
  return Ticket_priority;
};
