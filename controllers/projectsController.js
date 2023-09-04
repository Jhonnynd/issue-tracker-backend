const { sequelize } = require("../db/models");
const BaseController = require("./baseController");

class ProjectsController extends BaseController {
  constructor(model, user, user_project, ticket, projects_attachment) {
    super(model);
    this.userModel = user;
    this.user_projectModel = user_project;
    this.ticketModel = ticket;
    this.project_attachmentModel = projects_attachment;
  }

  async getOne(req, res) {
    const { projectId } = req.params;

    try {
      const output = await this.model.findOne({
        where: { id: projectId },
        include: [this.project_attachmentModel, this.userModel],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createOne(req, res) {
    const { title, description, submitter_id, userIds, url } = req.body;
    try {
      const project = await this.model.create({
        title,
        description,
        userId: submitter_id,
      });

      if (!project) throw new Error("Project could not be created");

      const associations = userIds.map((userId) => ({
        projectId: project.id,
        userId,
      }));
      const userProjects = await this.user_projectModel.bulkCreate(
        associations
      );

      if (url) {
        const savedImageUrl = await this.project_attachmentModel.create({
          url,
          projectId: project.id,
        });
        if (!savedImageUrl) throw new Error("Image URL could not be saved");
      }

      return res.json({ project, userProjects, success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
  async updateOne(req, res) {
    const projectId = parseInt(req.params.projectId, 10);
    const { title, description, submitter_id, userIds, url } = req.body;

    try {
      // Update project main details
      const updatedProject = await this.model.update(
        { title, description, userId: submitter_id },
        { where: { id: projectId } }
      );

      if (updatedProject[0] === 0) {
        throw new Error("Project could not be updated");
      }

      // Fetch existing userIds for this project
      const existingUserProjects = await this.user_projectModel.findAll({
        where: { projectId: projectId },
        attributes: ["userId"],
      });

      const existingUserIds = existingUserProjects.map((ep) => ep.userId);

      // Filter out userIds that already exist
      const newUserIds = userIds.filter(
        (userId) => !existingUserIds.includes(userId)
      );

      // Create associations for new userIds
      const associations = newUserIds.map((userId) => ({
        projectId: projectId,
        userId,
      }));

      if (associations.length > 0) {
        await this.user_projectModel.bulkCreate(associations);
      }

      if (url) {
        await this.project_attachmentModel.upsert({
          url,
          projectId,
        });
      }

      return res.json({ updatedProject, success: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async destroyProject(req, res) {
    const { projectId } = req.params;
    const t = await sequelize.transaction();

    try {
      await this.user_projectModel.destroy(
        {
          where: { projectId },
        },
        { transaction: t }
      );

      await this.project_attachmentModel.destroy(
        {
          where: { projectId },
        },
        { transaction: t }
      );

      await this.model.destroy(
        {
          where: { id: projectId },
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({ message: "Project deleted" });
    } catch (error) {
      await t.rollback();

      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async getProjectsFromUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await this.userModel.findByPk(userId, {
        include: {
          model: this.model,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user.projects);
    } catch (error) {
      console.error("Error: ", error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}
module.exports = ProjectsController;
