const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_review_attachment extends Model {
    static associate(models) {
      this.belongsTo(models.ticket_review);
    }
  }
  Ticket_review_attachment.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ticket_review_attachment",
      underscored: true,
    }
  );
  return Ticket_review_attachment;
};
