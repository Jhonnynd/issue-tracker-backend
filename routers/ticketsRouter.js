const express = require("express");
const router = express.Router();

class TicketsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.put("/:ticketId", this.controller.updateOne.bind(this.controller));
    router.get(
      "/ticket/:ticketId",
      this.controller.getOne.bind(this.controller)
    );
    router.post(
      "/:ticketId/review",
      this.controller.submitTicketReview.bind(this.controller)
    );
    router.get(
      "/:ticketId/comments",
      this.controller.getAllComments.bind(this.controller)
    );
    router.post(
      "/:ticketId/comments",
      this.controller.createOneComment.bind(this.controller)
    );
    router.post("/", this.controller.createOne.bind(this.controller));
    router.get(
      "/types",
      this.controller.getAllTicketTypes.bind(this.controller)
    );
    router.get(
      "/list",
      this.controller.getAllTicketsWithInfo.bind(this.controller)
    );
    router.get(
      "/project/:projectId/tickets",
      this.controller.getTicketsFromProject.bind(this.controller)
    );
    router.put(
      "/:ticketId/status",
      this.controller.updateTicketStatus.bind(this.controller)
    );
    return router;
  }
}

module.exports = TicketsRouter;
