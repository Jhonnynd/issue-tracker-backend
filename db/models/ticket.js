const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.ticket_priority);
      this.belongsTo(models.ticket_status);
      this.belongsTo(models.ticket_type);

      this.hasMany(models.ticket_comment);
      this.hasMany(models.ticket_review);
      this.hasMany(models.ticket_attachment);

      this.belongsTo(models.user, { as: "assigned_user" });
      this.belongsTo(models.user, { as: "submitter" });

      this.belongsTo(models.project);
    }
  }
  Ticket.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ticket",
      underscored: true,
    }
  );
  return Ticket;
};
