module.exports = app => {
  const sprint = require("../controllers/sprint.controller.js");

  var router = require("express").Router();

  router.get("/sprints/:id", sprint.findOne);
  router.get("/sprints", sprint.findAll);
  
  
  
  
  app.use('/api/', router);
};