import { Sequelize } from "sequelize";
import { env } from "../config/env";
import { initTaskModel, Task } from "../models/Task";
import { initUserModel, User } from "../models/User";

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: "mysql",
  logging: env.nodeEnv === "development" ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

initUserModel(sequelize);
initTaskModel(sequelize);

User.hasMany(Task, {
  foreignKey: "created_by",
  as: "createdTasks"
});

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "assignedTasks"
});

Task.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator"
});

Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee"
});

export const connectDatabase = async () => {
  await sequelize.authenticate();
};

export { User, Task };
