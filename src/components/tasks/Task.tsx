import React, { useState } from "react";
import { TaskData } from "../../utils/types";
import CircularProgress from "../CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TaskEditDialog from "./TaskEditDialog";
import { deleteTask, updateTask } from "../../api/api";
import DeleteSuccessDialog from "../DeleteSuccessDialog";
import EditSuccessDialog from "../EditDialogSuccess";

interface TaskProps {
  task: TaskData;
  onUpdateTask: (updatedTask: TaskData) => void;
  onDeleteTask: (taskID: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCompleteTask = async () => {
    if (task.taskID !== undefined) {
      // Create a new task object with completed set to true and status set to pending
      const newTask: TaskData = {
        ...task,
        completed: true,
        status: "completed",
        subtasks: task.subtasks.map((subtask) => ({
          ...subtask,
          completed: true,
        })),
      };

      try {
        // Call the updateTasks function to update the task
        const response = await updateTask(newTask);
        console.log("Task marked as completed:", newTask);
        onUpdateTask(response.data);
      } catch (error: any) {
        console.error("Error completing task:", error.message);
      }
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveEdit = async (editedTask: TaskData) => {
    // Check if there are any subtasks with completed set to false
    const hasIncompleteSubtask = editedTask.subtasks.some(
      (subtask) => !subtask.completed
    );

    // Determine the new completed and status values for the task
    let newCompleted = false;
    let newStatus: "pending" | "completed" = "pending";

    if (!hasIncompleteSubtask) {
      newCompleted = true;
      newStatus = "completed";
    }

    // Create a new task object with updated completed and status values
    const updatedTask: TaskData = {
      ...editedTask,
      completed: newCompleted,
      status: newStatus,
    };

    try {
      const response = await updateTask(updatedTask);
      console.log(response);

      // Open the delete success dialog
      setIsEditDialogOpen(true);
      // Close the dialog after 3 seconds
      setTimeout(() => {
        setIsEditDialogOpen(false);
      }, 3000);
      onUpdateTask(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const totalSubtasks = task.subtasks.length;

  const progressPercentage = totalSubtasks
    ? Math.round((completedSubtasks / totalSubtasks) * 100)
    : 0;

  const onDelete = async () => {
    if (task.taskID !== undefined) {
      try {
        // Simulating a successful delete response
        const response = await deleteTask(task.taskID);
        console.log(response);

        // Open the delete success dialog
        setIsDeleteDialogOpen(true);
        // Close the dialog after 3 seconds
        setTimeout(() => {
          setIsDeleteDialogOpen(false);
        }, 3000);
        onDeleteTask(task.taskID);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="border bg-white p-4 m-4 shadow-xl rounded-xl">
      <h3 className="text-center mb-4 w-full bg-red-400 rounded-md text-white text-lg">
        {task.title}
      </h3>

      <div className="flex flex-col">
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Description:</span>
          <span>{task.description}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Due Date:</span>
          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-GB")
              : "No due date"}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Priority:</span>
          <span>{task.priority}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">Status:</span>
          <span
            className={`${
              task.status === "completed" ? "text-green-500" : "text-orange-500"
            }`}
          >
            {task.status}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold mr-1">SubTasks:</span>
          {task.subtasks.length > 0 ? (
            <div className="flex flex-wrap">
              {task.subtasks.map((subtask, index) => (
                <span
                  key={index}
                  className={`${
                    subtask.completed ? "bg-green-200" : "bg-yellow-100"
                  } rounded p-1 m-1 text-sm`}
                >
                  {subtask.title}
                </span>
              ))}
            </div>
          ) : (
            <span className=" text-gray-400 text-base font-medium">
              No subtasks are there
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <CircularProgress percent={progressPercentage} />
      </div>

      <div className="flex justify-center mt-4">
        <EditIcon
          className="cursor-pointer text-yellow-500 mr-4"
          onClick={handleOpenDialog}
        />
        <DeleteIcon
          className="cursor-pointer text-red-500 mr-4"
          onClick={onDelete}
        />
        {task.status !== "completed" ? (
          <CheckIcon
            className=" cursor-pointer text-green-500"
            onClick={handleCompleteTask}
          />
        ) : (
          <></>
        )}
      </div>
      <TaskEditDialog
        open={isDialogOpen}
        task={task}
        onClose={handleCloseDialog}
        onSave={handleSaveEdit}
      />

      {/* Delete Success Dialog */}
      <DeleteSuccessDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        message={"Task Deleted Successfully"}
      />
      {/* Edit Success Dialog */}
      <EditSuccessDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        message={"Task Edited Successfully"}
      />
    </div>
  );
};

export default Task;
