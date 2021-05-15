const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.findAllTasksOfSprint = (req, res) => {
  const id = req.params.id;
  var condition = id ? { Sprint_sprint_id: { [Op.like]: `%${id}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message 
      });
    });
  
};

exports.findAllTasksOfProject = (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message 
      });
    });
  
};

exports.findTaskById = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};