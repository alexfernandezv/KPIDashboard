//Sequelize initialization

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.project = require("./project.model.js")(sequelize, Sequelize);
db.sprint = require("./sprint.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

db.project.hasMany(db.sprint, { foreignKey: "Project_project_id" , as: "sprints" });
db.sprint.belongsTo(db.project, {
  foreignKey: "Project_project_id",
  as: "project",
});

db.sprint.hasMany(db.task, { foreignKey: "Sprint_sprint_id" , as: "tasks" });
db.task.belongsTo(db.sprint, {
  foreignKey: "Sprint_sprint_id",
  as: "sprint",
});
db.project.hasMany(db.user, { foreignKey: "Project_project_id" , as: "users" });
db.user.belongsTo(db.project, {
  foreignKey: "Project_project_id",
  as: "project",
});
db.user.hasMany(db.task, { foreignKey: "User_username" , as: "tasks" });
db.task.belongsTo(db.user, {
  foreignKey: "User_username",
  as: "user",
});

module.exports = db;
