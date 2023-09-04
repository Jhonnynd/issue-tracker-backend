const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, user_role, project, user_project) {
    super(model);
    this.user_roleModel = user_role;
    this.projectModel = project;
    this.user_projectModel = user_project;
  }

  // onLogin check if user exists, if not create
  async login(req, res) {
    const user = req.body;
    console.log("this is the user", user);
    let givenName = "";
    let familyName = "";
    let loginEmail = "";
    if (user.given_name !== "" && user.family_name !== "") {
      const { given_name, family_name, email } = req.body;
      givenName = given_name;
      familyName = family_name;
      loginEmail = email;
      console.log(givenName, familyName, email);
    } else {
      const { email } = req.body;
      givenName = null;
      familyName = null;
      loginEmail = email;
      console.log(givenName, familyName, email);
    }
    try {
      console.log("I'm in login try: b4 findone");
      const [checkedUser, created] = await this.model.findOrCreate({
        where: { email: loginEmail },
        defaults: {
          firstName: givenName,
          lastName: familyName,
          email: loginEmail,
          userRoleId: 3,
        },
      });

      if (created) {
        console.log("User Created!");
      } else {
        console.log("User retrieved!");
      }

      return res.json({ checkedUser });
    } catch (err) {
      console.log(err.message);

      console.log("I'm in login catch-try-catch: error");
      return res.status(400).json({ error: true, msg: err.message });
    }
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
