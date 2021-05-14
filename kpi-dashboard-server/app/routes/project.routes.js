module.exports = app => {
  const project = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Retrieve all project
  router.get("/projects", project.findAll);

  // Retrieve all published project
  router.get("/published", project.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/projects/:id", project.findOne);

  // Update a Tutorial with id
  router.put("/:id", project.update);

  // Delete a Tutorial with id
  router.delete("/:id", project.delete);

  // Delete all project
  router.delete("/", project.deleteAll);

  app.use('/api/', router);
};