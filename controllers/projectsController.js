const BaseController = require("./baseController");

class ProjectsController extends BaseController {
  constructor(model, user) {
    super(model);
    this.userModel = user;
  }

  // Retrieve specific listing. No authentication required.
}
module.exports = ProjectsController;
