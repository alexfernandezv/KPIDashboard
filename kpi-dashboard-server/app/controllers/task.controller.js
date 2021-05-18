const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

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