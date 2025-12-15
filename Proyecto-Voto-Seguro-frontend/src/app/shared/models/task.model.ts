export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToUserId: string;
  assignedToUserName: string;
  createdByUserId: string;
  createdByUserName: string;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface CreateTaskDto{
  title: string;
  description: string;
  assignedToUserId: string;
  dueDate?: Date;
  priority: string;
}

export interface UpdateTaskDto{
  title?: string;
  description?: string;
  assignedToUserId?: string;
  dueDate?: Date;
  priority?: string;
  status?: string;
}
