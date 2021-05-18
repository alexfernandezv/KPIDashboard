const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;
// Find a single Tutorial with an id
exports.findProjectById = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id, { include: ["sprints"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};

exports.findAll = (req, res) => {
  const id = req.params.id;
  Project.findAll({ include: ["sprints"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};