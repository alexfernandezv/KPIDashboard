module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    project_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    project_name: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    }
    
  }, {
    tableName: 'project'
  });

  return Project;
};