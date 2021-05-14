module.exports = app => {
  const project = require("../controllers/project.controller.js");

  var router = require("express").Router();

  router.get("/projects/:id", project.findOne);
  
  
  
  app.use('/api/', router);
};