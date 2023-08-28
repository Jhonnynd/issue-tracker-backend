const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_review extends Model {
    static associate(models) {
      this.belongsTo(models.ticket);
      this.belongsTo(models.ticket_review_attachment);
    }
  }
  Ticket_review.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_review",
      underscored: true,
    }
  );
  return Ticket_review;
};
