module.exports = app => {
  const sprint = require("../controllers/sprint.controller.js");

  var router = require("express").Router();

  router.get("/sprints/:id", sprint.findSprintById);
  router.get("/sprints/project/:id", sprint.findSprintsByProjectId);
  router.get("/sprints/project/:id/hours_worked", sprint.findHoursWorkedPerSprint);
  router.get("/sprints/project/:id/tasks", sprint.findTasksPerSprint);
  
  
  
  app.use('/api/', router);
};