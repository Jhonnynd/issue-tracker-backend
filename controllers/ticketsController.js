const BaseController = require("./baseController");

class TicketsController extends BaseController {
  constructor(
    model,
    ticket_priority,
    ticket_status,
    ticket_type,
    project,
    user
  ) {
    super(model);
    this.ticket_priorityModel = ticket_priority;
    this.ticket_statusModel = ticket_status;
    this.ticket_typeModel = ticket_type;
    this.projectModel = project;
    this.userModel = user;
  }

  async getAllTicketsWithInfo(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          {
            model: this.userModel,
            as: "assigned_user",
          },
          {
            model: this.userModel,
            as: "submitter",
          },
          this.ticket_statusModel,
          this.ticket_priorityModel,
          this.ticket_typeModel,
          this.projectModel,
        ],
      });
      res.status(200).json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}
module.exports = TicketsController;
