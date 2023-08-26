import React, { useState, useEffect } from "react";
import { TaskData } from "../../utils/types";
import CircularProgress from "../CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TaskEditDialog from "./TaskEditDialog";

interface TaskProps {
  task: TaskData;
  onEdit: (task: TaskData) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [subtaskCompletionStatus, setSubtaskCompletionStatus] = useState<
    boolean[]
  >(task.subtasks.map((subtask) => subtask.completed));

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveEdit = (editedTask: TaskData) => {
    onEdit(editedTask);
  };

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const totalSubtasks = task.subtasks.length;

  const progressPercentage = totalSubtasks
    ? Math.round((completedSubtasks / totalSubtasks) * 100)
    : 0;

  useEffect(() => {
    console.log("1st useEffect of Task component", task);
    if (task.completed) {
      setSubtaskCompletionStatus((prevStatus) => prevStatus.map(() => true));

      const updatedSubtasks = task.subtasks.map((subtask) => ({
        ...subtask,
        completed: true,
      }));
      onEdit({
        ...task,
        subtasks: updatedSubtasks,
      });
    }
  }, [task.completed]);

  useEffect(() => {
    console.log(
      "2nd useEffect of Task component",
      task,
      progressPercentage,
      task.completed,
      task.id
    );
    if (progressPercentage === 100 && !task.completed) {
      setSubtaskCompletionStatus((prevStatus) => prevStatus.map(() => true));

      onToggleComplete(task.id);
    }
  }, [progressPercentage, task.completed, task.id, onToggleComplete]);

  return (
    <div className="border bg-white p-4 m-4 shadow-md rounded-xl">
      <h3 className="text-center mb-4">{task.title}</h3>

      <div className="flex flex-col">
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Description:</span>
          <span>{task.description}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Due Date:</span>
          <span>{task.dueDate}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Priority:</span>
          <span>{task.priority}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Status:</span>
          <span
            className={`${
              progressPercentage === 100 ? "text-green-500" : "text-orange-500"
            }`}
          >
            {progressPercentage === 100 ? "Completed" : "Pending"}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">SubTasks:</span>
          <div className="flex flex-wrap">
            {task.subtasks.map((subtask, index) => (
              <span
                key={index}
                className={`${
                  subtask.completed ? "bg-green-200" : "bg-yellow-100"
                } rounded p-1 m-1 texts-sm`} // Added margin between subtasks
              >
                {subtask.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <CircularProgress percent={progressPercentage} />
      </div>

      <div className="flex justify-center mt-4">
        <EditIcon
          className="cursor-pointer text-yellow-400 mr-4"
          onClick={handleOpenDialog}
        />
        <DeleteIcon
          className="cursor-pointer text-red-400 mr-4"
          onClick={() => onDelete(task.id)}
        />
        {!task.completed && (
          <CheckIcon
            className="cursor-pointer text-green-400"
            onClick={() => onToggleComplete(task.id)}
          />
        )}
      </div>
      <TaskEditDialog
        open={isDialogOpen}
        task={task}
        onClose={handleCloseDialog}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Task;
