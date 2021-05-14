const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.findAllTasksOfSprint = (req, res) => {
  const id = req.query.id;
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