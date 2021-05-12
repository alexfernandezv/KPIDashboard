module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    title: {
      type: Sequelize.STRING
    },
    revenue: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Project;
};