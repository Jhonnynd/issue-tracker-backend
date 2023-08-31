const { sequelize } = require("../db/models");
const BaseController = require("./baseController");

class ProjectsController extends BaseController {
  constructor(model, user, user_project) {
    super(model);
    this.userModel = user;
    this.user_projectModel = user_project;
  }

  async getOne(req, res) {
    const { projectId } = req.params;

    try {
      const output = await this.model.findByPk(projectId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createOne(req, res) {
    const { title, description, submitter_id, userIds } = req.body;
    console.log(req.body);
    try {
      const output = await this.model.create({
        title,
        description,
        userId: submitter_id,
      });

      const associations = userIds.map((userId) => {
        return {
          projectId: output.id,
          userId,
        };
      });

      const userProjects = await this.user_projectModel.bulkCreate(
        associations
      );

      return res.json({
        output,
        userProjects,
        success: true,
        message: "Address processed successfully",
      });
    } catch (error) {
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
