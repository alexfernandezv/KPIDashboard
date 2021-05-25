module.exports = app => {
  const sprint = require("../controllers/sprint.controller.js");

  var router = require("express").Router();

  router.get("/sprints/:id", sprint.findSprintById);
  router.get("/sprints/project/:id", sprint.findSprintsByProjectId);
  router.get("/sprints/project/:id/hours_worked", sprint.findHoursWorkedPerSprint);
  
  
  
  
  app.use('/api/', router);
};