const db = require("../models");
const Sprint = db.sprint;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;

  Sprint.findAll({ where: condition })
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
exports.findOne = (req, res) => {
  const id = req.params.id;
  Sprint.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};