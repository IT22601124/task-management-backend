import { Op, WhereOptions } from "sequelize";
import { Task, User } from "../database";
import { AuthUser } from "../types/user";
import { AppError } from "../utils/AppError";

const taskIncludes = [
  { model: User, as: "creator", attributes: ["id", "name", "email", "role"] },
  { model: User, as: "assignee", attributes: ["id", "name", "email", "role"] }
];

const canAccessTask = (task: Task, user: AuthUser) => {
  return user.role === "admin" || task.created_by === user.id || task.assigned_to === user.id;
};

const canModifyTask = (task: Task, user: AuthUser) => {
  return user.role === "admin" || task.created_by === user.id || task.assigned_to === user.id;
};

export const getTasks = async (query: Record<string, string | undefined>, user: AuthUser) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
  const offset = (page - 1) * limit;
  const sortBy = query.sortBy || "created_at";
  const sortOrder = (query.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

  const where: WhereOptions = {};

  if (query.title) {
    where.title = { [Op.like]: `%${query.title}%` };
  }

  if (query.priority) {
    where.priority = query.priority;
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.due_date) {
    where.due_date = query.due_date;
  }

  if (user.role !== "admin") {
    where[Op.or as unknown as string] = [{ created_by: user.id }, { assigned_to: user.id }];
  }

  const { rows, count } = await Task.findAndCountAll({
    where,
    include: taskIncludes,
    distinct: true,
    limit,
    offset,
    order: [[sortBy, sortOrder]]
  });

  return {
    tasks: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    }
  };
};

export const getTaskById = async (id: number, user: AuthUser) => {
  const task = await Task.findByPk(id, { include: taskIncludes });

  if (!task || !canAccessTask(task, user)) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const createTask = async (payload: Partial<Task>, user: AuthUser) => {
  if (payload.assigned_to) {
    const assignee = await User.findByPk(payload.assigned_to);
    if (!assignee) {
      throw new AppError("Assignee not found", 404);
    }
  }

  const task = await Task.create({
    title: payload.title as string,
    description: payload.description ?? null,
    priority: payload.priority || "medium",
    status: payload.status || "open",
    due_date: payload.due_date ?? null,
    created_by: user.id,
    assigned_to: payload.assigned_to ?? null
  });

  return getTaskById(task.id, user);
};

export const updateTask = async (id: number, payload: Partial<Task>, user: AuthUser) => {
  const task = await getTaskById(id, user);

  if (!canModifyTask(task, user)) {
    throw new AppError("You cannot update this task", 403);
  }

  if (payload.assigned_to && user.role !== "admin") {
    throw new AppError("Only admins can assign tasks to users", 403);
  }

  if (payload.assigned_to) {
    const assignee = await User.findByPk(payload.assigned_to);
    if (!assignee) {
      throw new AppError("Assignee not found", 404);
    }
  }

  await task.update({
    title: payload.title ?? task.title,
    description: payload.description ?? task.description,
    priority: payload.priority ?? task.priority,
    status: payload.status ?? task.status,
    due_date: payload.due_date ?? task.due_date,
    assigned_to: payload.assigned_to ?? task.assigned_to
  });

  return getTaskById(task.id, user);
};

export const deleteTask = async (id: number, user: AuthUser) => {
  const task = await getTaskById(id, user);

  if (user.role !== "admin" && task.created_by !== user.id) {
    throw new AppError("You cannot delete this task", 403);
  }

  await task.destroy();
};

export const getTaskStats = async (user: AuthUser) => {
  const where: WhereOptions = {};

  if (user.role !== "admin") {
    where[Op.or as unknown as string] = [{ created_by: user.id }, { assigned_to: user.id }];
  }

  const [total, open, inProgress, testing, done, recent] = await Promise.all([
    Task.count({ where }),
    Task.count({ where: { ...where, status: "open" } }),
    Task.count({ where: { ...where, status: "in_progress" } }),
    Task.count({ where: { ...where, status: "testing" } }),
    Task.count({ where: { ...where, status: "done" } }),
    Task.findAll({ where, include: taskIncludes, order: [["created_at", "DESC"]], limit: 5 })
  ]);

  return { total, open, in_progress: inProgress, testing, done, recent };
};
