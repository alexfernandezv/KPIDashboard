module.exports = app => {
  const sprint = require("../controllers/sprint.controller.js");

  var router = require("express").Router();

  router.get("/sprints/:id", sprint.findSprintById);
  router.get("/sprints/project/:id", sprint.findSprintsByProjectId);
  router.get("/sprints/project/:id/hours_worked", sprint.findHoursWorkedPerSprint);
  router.get("/sprints/project/:id/tasks", sprint.findTasksPerSprint);
  router.get("/sprints/project/:id/changes", sprint.findChangesPerSprint);
  router.get("/sprints/project/:id/:sprintid/burndown", sprint.getBurndown);
  router.get("/sprints/project/:id/:sprintid/story_points", sprint.getCompletedStoryPoints);
  router.get("/sprints/project/:id/bugs", sprint.findBugsPerSprint);
  
  
  app.use('/api/', router);
};