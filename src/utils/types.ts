export interface TaskData {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  priority: "low" | "medium" | "high"; // Use constrained values here
  dueDate: string;
  completed: boolean;
}

export interface Subtask {
  title: string;
  completed: boolean;
}
