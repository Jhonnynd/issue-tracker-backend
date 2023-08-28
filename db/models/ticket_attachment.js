const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_attachment extends Model {
    static associate(models) {
      this.belongsTo(models.ticket);
    }
  }
  Ticket_attachment.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_attachment",
      underscored: true,
    }
  );
  return Ticket_attachment;
};
