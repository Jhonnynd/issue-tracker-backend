const BaseController = require("./baseController");

class TicketsController extends BaseController {
  constructor(
    model,
    ticket_priority,
    ticket_status,
    ticket_type,
    project,
    user,
    ticket_attachment,
    user_role,
    ticket_comment
  ) {
    super(model);
    this.ticket_priorityModel = ticket_priority;
    this.ticket_statusModel = ticket_status;
    this.ticket_typeModel = ticket_type;
    this.projectModel = project;
    this.userModel = user;
    this.ticket_attachmentModel = ticket_attachment;
    this.user_roleModel = user_role;
    this.ticket_commentModel = ticket_comment;
  }
  async getOne(req, res) {
    try {
      const { ticketId } = req.params;

      const output = await this.model.findOne({
        where: { id: ticketId },
        include: [
          this.ticket_statusModel,
          this.ticket_priorityModel,
          this.ticket_typeModel,
          this.projectModel,
          this.ticket_attachmentModel,
          {
            model: this.userModel,
            as: "assigned_user",
            include: [this.user_roleModel],
          },
          {
            model: this.userModel,
            as: "submitter",
            include: [this.user_roleModel],
          },
        ],
      });

      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
  async createOne(req, res) {
    console.log(req.body);
    try {
      const {
        title,
        description,
        projectId,
        submitterId,
        assignedUserId,
        ticketPriorityId,
        ticketTypeId,
        url,
      } = req.body;

      const ticket = await this.model.create({
        title: title,
        description: description,
        projectId: projectId,
        submitter_id: 1,
        assigned_user_id: assignedUserId,
        ticketPriorityId: ticketPriorityId,
        ticketTypeId: ticketTypeId,
        ticketStatusId: 1,
      });
      console.log("this is the ticket", ticket);

      const savedImageUrl = await this.ticket_attachmentModel.create({
        url: url,
        ticketId: ticket.id,
      });
      console.log("done");
      return res.status(200).json({ message: "Ticket successfully created!" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getAllComments(req, res) {
    try {
      const ticketId = parseInt(req.params.ticketId, 10);

      const comments = await this.ticket_commentModel.findAll({
        where: { ticketId: ticketId },
        include: [
          {
            model: this.userModel,
            include: [
              {
                model: this.user_roleModel,
              },
            ],
          },
        ],
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async createOneComment(req, res) {
    try {
      const { description, userId } = req.body;

      const ticketId = parseInt(req.params.ticketId, 10);

      console.log(req.body);
      console.log("UserId:", userId, " TicketId:", ticketId);

      const comment = await this.ticket_commentModel.create({
        userId: parseInt(userId, 10),
        description,
        ticketId,
      });

      return res.status(200).json({ message: "comment created" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async updateOne(req, res) {
    try {
      const { title, description, ticketPriorityId, ticketTypeId } = req.body;

      const { ticketId } = req.params;

      const updatedTicket = await this.model.update(
        {
          title,
          description,
          ticketPriorityId,
          ticketTypeId,
        },
        {
          where: { id: ticketId },
        }
      );

      return res.status(200).json({ message: "Ticket updated" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async updateTicketStatus(req, res) {
    try {
      const { ticketId } = req.params;
      const { ticketStatusId } = req.body;

      console.log("ticketstatusid", ticketStatusId);

      const updatedTicket = await this.model.update(
        { ticketStatusId },
        { where: { id: ticketId } }
      );
      res.json({
        success: true,
        message: "Ticket status updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getAllTicketsWithInfo(req, res) {
    try {
      const output = await this.projectModel.findAll({
        include: [
          {
            model: this.model,
            include: [
              this.ticket_statusModel,
              this.ticket_priorityModel,
              this.ticket_typeModel,
            ],
          },
        ],
      });
      res.status(200).json(output);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getAllTicketTypes(req, res) {
    try {
      const ticket_statuses = await this.ticket_statusModel.findAll();
      const ticket_priorities = await this.ticket_priorityModel.findAll();
      const ticket_types = await this.ticket_typeModel.findAll();

      res.status(200).json({
        ticket_statuses: ticket_statuses,
        ticket_priorities: ticket_priorities,
        ticket_types: ticket_types,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getTicketsFromProject(req, res) {
    try {
      const { projectId } = req.params;
      const output = await this.model.findAll({
        where: { projectId: projectId },
        include: [
          this.ticket_statusModel,
          this.ticket_priorityModel,
          this.ticket_typeModel,
        ],
      });
      return res.json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}
module.exports = TicketsController;
