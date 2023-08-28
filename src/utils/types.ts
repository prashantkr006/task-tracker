export interface TaskData {
  taskID?: number; // Corrected type
  title: string;
  description: string;
  priority: "low" | "medium" | "high"; // Enum type
  subtasks: Subtask[];
  dueDate: string; // Corrected type
  completed: boolean;
  status: "pending" | "completed"; // Enum type
}

export interface Subtask {
  title: string;
  completed: boolean;
}
