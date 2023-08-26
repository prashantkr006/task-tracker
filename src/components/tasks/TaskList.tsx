import React from "react";
import Task from "./Task";
import { TaskData } from "../../utils/types";

interface TaskListProps {
  tasks: TaskData[];
  onEdit: (task: TaskData) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="flex flex-wrap justify-center w-full">
      {tasks.map((task) => (
        <div key={task.id} className=" w-full md:w-1/3 lg:w-1/4">
          <Task
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
