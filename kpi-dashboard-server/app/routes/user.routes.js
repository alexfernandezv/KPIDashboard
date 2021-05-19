module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.get("/users/:id", user.findUserByUsername);
  router.get("/usersRole/:id", user.findUserRoleByUsername);
  router.get("/users/:id/tasks_per_role", user.findTasksPerRole)
  app.use('/api/', router);
};