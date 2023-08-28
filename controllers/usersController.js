const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, user_role) {
    super(model);
    this.user_roleModel = user_role;
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
}
module.exports = UsersController;
