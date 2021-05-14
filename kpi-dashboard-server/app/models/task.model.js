module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    task_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.STRING
    },
    creation_date: {
      type: Sequelize.DATE
    },
    estimated_duration: {
      type: Sequelize.DATE
    },
    worked_hours: {
      type: Sequelize.DATE
    },
    start_date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    },
    creator_id: {
      type: Sequelize.INTEGER
    },
    Sprint_sprint_id: {
      type: Sequelize.INTEGER
    },
    User_username: {
      type: Sequelize.STRING
    },
  }, {
    tableName: 'task'
  });

  return Task;
};