const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket_comment extends Model {
    static associate(models) {
      this.belongsTo(models.ticket);
    }
  }
  Ticket_comment.init(
    {
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ticket_comment",
      underscored: true,
    }
  );
  return Ticket_comment;
};
