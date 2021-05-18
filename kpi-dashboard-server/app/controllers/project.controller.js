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
exports.getUsersOfProject = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id, { include: ["users"] })
    .then(data => {
      var roles ={}
      data.users.forEach(user => {
        if(user.role in Object.keys(roles)){
          let count = roles[user.role]
          roles[user.role] = count +1;
        }
        else{
          roles[user.role] = 1;
        }
        
      })
      res.send({roles: roles})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};

