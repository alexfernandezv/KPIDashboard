module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    Project_project_id: {
      type: Sequelize.INTEGER
    },
  }, {
    tableName: 'user'
  });

  return User;
};