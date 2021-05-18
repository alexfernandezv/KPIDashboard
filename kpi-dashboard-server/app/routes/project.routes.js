module.exports = app => {
  const project = require("../controllers/project.controller.js");
  const sprint = require("../controllers/sprint.controller.js");
  var router = require("express").Router();

  router.get("/projects/:id", project.findProjectById);
  router.get("/projects", project.findAll);
  router.get("/projects/:id/worked_hours", sprint.getWorkedHours);
  
  app.use('/api/', router);
};