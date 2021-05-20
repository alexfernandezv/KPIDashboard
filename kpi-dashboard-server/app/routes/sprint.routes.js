module.exports = app => {
  const sprint = require("../controllers/sprint.controller.js");

  var router = require("express").Router();

  router.get("/sprints/:id", sprint.findSprintById);
  router.get("/sprints/project/:id", sprint.findSprintsByProjectId);

  
  
  
  
  app.use('/api/', router);
};