const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.put("/:userId", this.controller.updateUser.bind(this.controller));

    router.get(
      "/list",
      this.controller.getUsersWithRoles.bind(this.controller)
    );
    router.get(
      "/userroles",
      this.controller.getAllUserRoles.bind(this.controller)
    );
    router.get(
      "/projects/:projectId",
      this.controller.getUsersFromAProject.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
