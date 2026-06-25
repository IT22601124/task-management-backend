import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize
} from "sequelize";
import { TaskPriority, TaskStatus } from "../types/task";
import { User } from "./User";

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare priority: CreationOptional<TaskPriority>;
  declare status: CreationOptional<TaskStatus>;
  declare due_date: Date | null;
  declare created_by: number;
  declare assigned_to: number | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  declare creator?: NonAttribute<User>;
  declare assignee?: NonAttribute<User>;
}

export const initTaskModel = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(180),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium"
      },
      status: {
        type: DataTypes.ENUM("open", "in_progress", "testing", "done"),
        allowNull: false,
        defaultValue: "open"
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      assigned_to: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      tableName: "tasks",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
