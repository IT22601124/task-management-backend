export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "open" | "in_progress" | "testing" | "done";

export interface TaskFilters {
  title?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  due_date?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}
