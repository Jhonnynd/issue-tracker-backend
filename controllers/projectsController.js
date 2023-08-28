const BaseController = require("./baseController");

class ProjectsController extends BaseController {
  constructor(model, user) {
    super(model);
    this.userModel = user;
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
    const { title, description, userId } = req.body;
    try {
      const output = await this.model.create({
        title,
        description,
        userId,
      });
      return res.json({
        output,
        success: true,
        message: "Address processed successfully",
      });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getProjectsFromUser(req, res) {
    try {
      const userId = req.params.userId; // Assuming you're passing the userId in the route
      const user = await this.userModel.findByPk(userId, {
        include: {
          model: this.model,
          through: "user_project",
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user.projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = ProjectsController;
