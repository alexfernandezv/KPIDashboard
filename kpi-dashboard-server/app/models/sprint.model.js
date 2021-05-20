module.exports = (sequelize, Sequelize) => {
  const Sprint = sequelize.define("sprint", {
    sprint_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    sprint_name: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    },
    Project_project_id: {
      type: Sequelize.INTEGER,
    }
  }, {
    tableName: 'sprint'
  });

  return Sprint;
};