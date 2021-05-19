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

exports.findTasksPerRole= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  User.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var roles ={}
      data.forEach(user => {
        if(user.role in roles == false){
          let completedTasks = 0;
          let totalTasks = 0;
          user.tasks.forEach(task => {
            if(task.status == "Completed"){
              completedTasks++;
            }
            totalTasks++;
          })
          roles[user.role] = {completedTasks: completedTasks, totalTasks: totalTasks}
        }
        else{
          let auxCompletedTasks = roles[user.role].completedTasks;
          let auxTotalTasks = roles[user.role].totalTasks;
          let completedTasks = 0;
          let totalTasks = 0;
          user.tasks.forEach(task => {
            if(task.status == "Completed"){
              completedTasks++;
            }
            totalTasks++;
          })
          roles[user.role] =  {completedTasks: completedTasks + auxCompletedTasks, totalTasks: totalTasks + auxTotalTasks}
        }
        
      })
      res.send(roles)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  }

  exports.findHoursPerRole= (req, res) => {
    const id = req.params.id;
    var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
    User.findAll({where: condition, include: ["tasks"] })
      .then(data => {
        var roles ={}
        data.forEach(user => {
          if(user.role in roles == false){
            let hoursNeeded = 0;
            let hoursPlanned= 0;
            user.tasks.forEach(task => {
              hoursNeeded += task.worked_hours;
              hoursPlanned += task.estimated_duration;
            })
            roles[user.role] = {hoursNeeded: hoursNeeded, hoursPlanned: hoursPlanned}
          }
          else{
            let auxHoursNeeded = roles[user.role].hoursNeeded;
            let auxHoursPlanned = roles[user.role].hoursPlanned;
            let hoursNeeded = 0;
            let hoursPlanned= 0;
            user.tasks.forEach(task => {
              hoursNeeded += task.worked_hours;
              hoursPlanned += task.estimated_duration;
            })
            roles[user.role] =  {hoursNeeded: hoursNeeded + auxHoursNeeded, hoursPlanned: hoursPlanned + auxHoursPlanned}
          }
          
        })
        res.send(roles)
      })
      .catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
  }