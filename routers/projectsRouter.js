const express = require("express");
const router = express.Router();

class ProjectsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/user/:userId",
      this.controller.getProjectsFromUser.bind(this.controller)
    );
    router.post("/", this.controller.createOne.bind(this.controller));

    return router;
  }
}

module.exports = ProjectsRouter;
