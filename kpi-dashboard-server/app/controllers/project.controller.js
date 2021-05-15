const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;
// Find a single Tutorial with an id
exports.findProjectById = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};