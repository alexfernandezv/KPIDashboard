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
        var remainingHours = 0;
        sprint.tasks.forEach((task)=>{
          if(task.status == 'Completed'){
            workedHours+=task.worked_hours
          }
          else{
            remainingHours+=task.estimated_duration;
          }
        })
        sprints[sprint.sprint_id] = {workedHours: workedHours, remainingHours: remainingHours}
      })
      res.send(sprints)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.findTasksPerSprint= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var sprints ={};
      data.forEach((sprint)=>{
        var totalTasks = 0;
        var completedTasks = 0;
        sprint.tasks.forEach((task)=>{
          if(task.status == 'Completed'){
            completedTasks += 1;
          }
          totalTasks += 1;
        })
        sprints[sprint.sprint_id] = {totalTasks: totalTasks, completedTasks: completedTasks}
      })
      res.send(sprints)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.getBurndown= (req, res) => {
  const id = req.params.id;
  const sprintid = req.params.sprintid;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` }, sprint_id: { [Op.like]: `%${sprintid}%` },  } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var obj ={};
      data.forEach((sprint)=>{
        var sprintDays= Math.round((new Date(sprint.end_date) - new Date(sprint.start_date)) / (24 * 60 * 60 * 1000));
        var totalTasks = 0;
        var date1 = new Date(sprint.start_date);
        date1.setDate(date1.getDate() +  Math.round((sprintDays/3)))
        var date2 = new Date(date1)
        date2.setDate(date2.getDate() +  Math.round((sprintDays/3)))
        var date3 = new Date(date2)
        date3.setDate(date3.getDate() +  Math.round((sprintDays/3)))
        
        var tasksCompleted1 = 0;
        var tasksCompleted2 = 0;
        var tasksCompleted3 = 0;
        sprint.tasks.forEach((task)=>{
          
          if(task.status == 'Completed'){
            if(new Date(task.end_date) <= date1){
              tasksCompleted1 += 1;
            }
            else if(new Date(task.end_date) <= date2){
              tasksCompleted2 += 1;
            }
            else if(new Date(task.end_date) <= date3){
              tasksCompleted3 += 1;
            }
          }
          totalTasks += 1;
        })
        obj = {sprintDays: sprintDays, totalTasks: totalTasks, tasksCompleted1: tasksCompleted1, 
          tasksCompleted2: tasksCompleted2, tasksCompleted3: tasksCompleted3}
      })
      res.send(obj)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.getCompletedStoryPoints= (req, res) => {
  const id = req.params.id;
  const sprintid = req.params.sprintid;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` }, sprint_id: { [Op.like]: `%${sprintid}%` },  } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var obj ={};
      data.forEach((sprint)=>{
        var sprintDays= Math.round((new Date(sprint.end_date) - new Date(sprint.start_date)) / (24 * 60 * 60 * 1000));
        var totalTasks = 0;
        var tasksCompleted1 = 0;
        var tasksCompleted2 = 0;
        var tasksCompleted3 = 0;
        for(let i=0;i<=sprintDays;i++){
          obj[i] = 0;
          sprint.tasks.forEach((task)=>{
            let taskEndDay = Math.round((new Date(task.end_date) - new Date(sprint.start_date)) / (24 * 60 * 60 * 1000));
            if(task.status == 'Completed' && taskEndDay==i){
             obj[i] = obj[i] + 1;
            }
          })

        }
      })
      res.send(obj)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.findChangesPerSprint= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var sprints ={};
      data.forEach((sprint)=>{
        var addedTasks = 0;
        var sprintStartDate = new Date(sprint.start_date)
        sprint.tasks.forEach((task)=>{
          if(task.creation_date>sprint.start_date){
            addedTasks += 1;
          }
        })
        sprints[sprint.sprint_id] = {addedTasks: addedTasks}
      })
      res.send(sprints)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};
exports.computeEfectiveness= (req, res) => {
  const id = req.params.id;
  var condition = id ? { Project_project_id: { [Op.like]: `%${id}%` } } : null;
  var tasks = []
  Sprint.findAll({where: condition, include: ["tasks"] })
    .then(data => {
      var totalTasks = 0;
      var leadTimeAux = 0;
      var cycleTimeAux = 0;
      var totalWorkedHours = 0;
      var totalPlannedHours = 0;
      data.forEach((sprint)=>{
        sprint.tasks.forEach( task =>{
          if(task.status == "Completed"){
            totalTasks += 1;
            leadTimeAux +=  Math.round((new Date(task.end_date) - new Date(task.creation_date)) /  3600000);
            cycleTimeAux += Math.round((new Date(task.end_date) - new Date(task.start_date)) /  3600000);
            totalWorkedHours += task.worked_hours;
          }
          totalPlannedHours += task.estimated_duration;
        }
      )
    })
    res.send({leadTime: Math.round(leadTimeAux/totalTasks), cycleTime: Math.round(cycleTimeAux/totalTasks), accomplishmentRatio:  Math.round((totalWorkedHours/totalPlannedHours)*100)})
    });
};


