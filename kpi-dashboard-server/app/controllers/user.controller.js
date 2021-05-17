const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
// Find a single Tutorial with an id
exports.findUserByUsername = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};
exports.findUserRoleByUsername = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {attributes: ['role']})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  
};