const db = require("../models");
const Sprint = db.sprint;
const Op = db.Sequelize.Op;


exports.findSprintById= (req, res) => {
  const id = req.params.id;
  Sprint.findByPk(id, { include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};
exports.findSprintByProjectId= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  
};

exports.getWorkedHours= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var workedHours = 0;
      data.forEach((sprint)=>{
        sprint.tasks.forEach((task)=>{
          workedHours+=task.worked_hours
        })
      })
      res.send({total_worked_hours: workedHours})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};