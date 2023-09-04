const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, user_role, project, user_project) {
    super(model);
    this.user_roleModel = user_role;
    this.projectModel = project;
    this.user_projectModel = user_project;
  }

  // Retrieve specific listing. No authentication required.
  async getOne(req, res) {
    const { userId } = req.params;

    try {
      const output = await this.model.findByPk(userId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllUserRoles(req, res) {
    try {
      const output = await this.user_roleModel.findAll();

      return res.status(200).json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUsersWithRoles(req, res) {
    try {
      const output = await this.model.findAll({
        include: [{ model: this.user_roleModel }],
      });
      res.status(200).json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const { userRoleId } = req.body;
      console.log(userId, userRoleId);
      console.log("type", typeof userRoleId);
      console.log("type", typeof userId);
      const output = await this.model.update(
        { userRoleId: userRoleId },
        { where: { id: userId } }
      );

      res.status(200).json(output);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getUsersFromAProject(req, res) {
    //idk whats happenin here
    try {
      const projectId = req.params.projectId;

      const usersFromProject = await this.user_projectModel.findAll({
        where: { project_id: projectId },

        include: [
          {
            model: this.model,
            include: [
              {
                model: this.user_roleModel,
              },
            ],
          },
        ],
      });

      return res.status(200).json(usersFromProject);
    } catch (error) {
      console.error("Error: ", error);
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}
module.exports = UsersController;
