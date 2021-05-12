module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", projects.create);

  // Retrieve all project
  router.get("/", projects.findAll);

  // Retrieve all published projects
  router.get("/published", projects.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", projects.findOne);

  // Update a Tutorial with id
  router.put("/:id", projects.update);

  // Delete a Tutorial with id
  router.delete("/:id", projects.delete);

  // Delete all projects
  router.delete("/", projects.deleteAll);

  app.use('/api/projects', router);
};