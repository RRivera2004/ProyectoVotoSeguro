export interface TaskStatistics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;
  overdueTasks: number;
  completionRate: number;
  tasksByUsers: TasksByUser[];
  tasksByPriorities: TasksByPriority[];
  tasksByStatuses: TasksByStatus[];
}

export interface TasksByUser {
  userId: string;
  userName: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface TasksByPriority {
  priority: string;
  count: number;
}

export interface TasksByStatus {
  status: string;
  count: number;
}
