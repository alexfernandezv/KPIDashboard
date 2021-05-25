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
exports.findSprintsByProjectId= (req, res) => {
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
exports.getTasksOfProject= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  var tasks = []
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      data.forEach((sprint)=>{
        sprint.tasks.forEach( task =>{
          tasks.push(task)
        }
      )
    })
    res.send({tasks: tasks})
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

exports.getProjectMembers= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var members = []
      data.forEach((sprint)=>{
        sprint.tasks.forEach((task)=>{
          if(!members.includes(task.User_username))
            members.push(task.User_username)
        })
      })
      res.send({members: members})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.getProjectTasksEstimatedAndNeededHours= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var estimated_hours = 0
      var needed_hours = 0;
      data.forEach((sprint)=>{
        sprint.tasks.forEach((task)=>{
         estimated_hours += task.estimated_duration
         needed_hours += task.worked_hours
        })
      })
      res.send({estimated_hours: estimated_hours, needed_hours: needed_hours})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};
exports.getTasksCompletedAndNot= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var completed_tasks = 0
      var notCompleted_tasks = 0;
      data.forEach((sprint)=>{
        sprint.tasks.forEach((task)=>{
          if(task.status == 'Completed'){
            completed_tasks++;
          }
          else{
            notCompleted_tasks++
          }
        })
      })
      res.send({completed_tasks: completed_tasks, notCompleted_tasks: notCompleted_tasks})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.findHoursWorkedPerSprint= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var sprints ={};
      data.forEach((sprint)=>{
        var workedHours = 0;
        sprint.tasks.forEach((task)=>{
          if(task.status == 'Completed'){
            workedHours+=task.worked_hours
          }
        })
        sprints[sprint.sprint_id] = workedHours
      })
      res.send(sprints)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};





