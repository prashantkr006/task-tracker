import React from "react";
import Task from "./Task";
import { TaskData } from "../../utils/types";

interface TaskListProps {
  tasks: TaskData[];
  onUpdateTask: (updatedTask: TaskData) => void; // Add this prop
  onDeleteTask: (taskID: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <>
      {tasks.length > 0 ? (
        <div className="flex flex-wrap justify-center w-full">
          {tasks.map((task: TaskData) => (
            <div key={task.taskID} className="w-full md:w-1/3 lg:w-1/4">
              <Task
                task={task}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-xl font-semibold">
            You don't have any tasks yet, Add some tasks
          </h1>
        </div>
      )}
    </>
  );
};

export default TaskList;
