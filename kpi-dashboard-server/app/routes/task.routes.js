module.exports = app => {
  const task = require("../controllers/task.controller.js");

  var router = require("express").Router();

  router.get("/tasks/:id", task.findTaskById);
  
  
  
  
  app.use('/api/', router);
};