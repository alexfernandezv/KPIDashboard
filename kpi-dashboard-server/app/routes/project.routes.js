module.exports = app => {
  const project = require("../controllers/project.controller.js");
  const sprint = require("../controllers/sprint.controller.js");
  var router = require("express").Router();

  router.get("/projects/:id", project.findProjectById);
  router.get("/projects", project.findAll);
  router.get("/projects/:id/worked_hours", sprint.getWorkedHours);
  router.get("/projects/:id/tasks", sprint.getTasksOfProject);
  router.get("/projects/:id/members", sprint.getProjectMembers);
  router.get("/projects/:id/tasks/hours", sprint.getProjectTasksEstimatedAndNeededHours);
  router.get("/projects/:id/tasks/check_completion", sprint.getTasksCompletedAndNot);
  router.get("/projects/:id/user_roles",project.getUsersOfProject)
  app.use('/api/', router);
};