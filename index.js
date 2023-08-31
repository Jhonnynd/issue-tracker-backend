const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");
const {
  user,
  user_role,
  project,
  ticket,
  user_project,
  ticket_priority,
  ticket_status,
  ticket_type,
} = db;

// importing Controllers
const UsersController = require("./controllers/usersController.js");
const ProjectsController = require("./controllers/projectsController.js");
const TicketsController = require("./controllers/ticketsController.js");

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController(
  user,
  user_role,
  project,
  user_project
);
const projectsController = new ProjectsController(project, user, user_project);
const ticketsController = new TicketsController(
  ticket,
  ticket_priority,
  ticket_status,
  ticket_type,
  project,
  user
);

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const ProjectsRouter = require("./routers/projectsRouter");
const TicketsRouter = require("./routers/ticketsRouter");

// declare port to listen to and initialise Express
const PORT = process.env.PORT;
const app = express();

// initialize Routers
const usersRouter = new UsersRouter(usersController);
const projectsRouter = new ProjectsRouter(projectsController);
const ticketsRouter = new TicketsRouter(ticketsController);

// Enable CORS access to this server
const corsOptions = {
  origin: process.env.CORS_OPTIONS,
};

app.use(cors(corsOptions));

// Enable reading JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable and use router
app.use("/users", usersRouter.routes());
app.use("/projects", projectsRouter.routes());
app.use("/tickets", ticketsRouter.routes());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
