import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { TaskData } from "../../utils/types";

interface TaskEditDialogProps {
  open: boolean;
  task: TaskData;
  onClose: () => void;
  onSave: (editedTask: TaskData) => void;
}

const TaskEditDialog: React.FC<TaskEditDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState(task);
  const [newSubtask, setNewSubtask] = useState("");

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubtaskChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSubtasks = [...editedTask.subtasks];
      newSubtasks[index].completed = event.target.checked;
      setEditedTask((prevTask) => ({
        ...prevTask,
        subtasks: newSubtasks,
      }));

      // Update main task completion status based on subtasks
      const allSubtasksCompleted = newSubtasks.every(
        (subtask) => subtask.completed
      );
      setEditedTask((prevTask) => ({
        ...prevTask,
        completed: allSubtasksCompleted,
      }));
    };

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      const updatedSubtasks = [
        ...editedTask.subtasks,
        { title: newSubtask, completed: false },
      ];
      setEditedTask((prevTask) => ({
        ...prevTask,
        subtasks: updatedSubtasks,
      }));
      setNewSubtask("");
    }
  };

  const handleDeleteSubtask = (index: number) => () => {
    const newSubtasks = [...editedTask.subtasks];
    newSubtasks.splice(index, 1);
    setEditedTask((prevTask) => ({
      ...prevTask,
      subtasks: newSubtasks,
    }));
  };

  const handleEditFormSubmit = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={editedTask.title}
          onChange={handleEditFormChange}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Description"
          name="description"
          value={editedTask.description}
          onChange={handleEditFormChange}
          fullWidth
          multiline
          margin="dense"
          disabled
        />
        <TextField
          label="Due Date"
          type="date"
          name="dueDate"
          value={editedTask.dueDate}
          onChange={handleEditFormChange}
          fullWidth
          margin="dense"
        />
        <div>
          {editedTask.subtasks.map((subtask, index) => (
            <div key={index} className="subtask">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subtask.completed}
                    onChange={handleSubtaskChange(index)}
                  />
                }
                label={subtask.title}
                disabled={subtask.completed}
              />
              {!subtask.completed && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleDeleteSubtask(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <div className="subtask">
            <TextField
              label="New Subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              fullWidth
              margin="dense"
            />
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={handleAddSubtask}
            >
              Add Subtask
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleEditFormSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
