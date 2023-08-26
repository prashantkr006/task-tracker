import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { TaskData, Subtask } from "../../utils/types";
import ClearIcon from "@mui/icons-material/Clear";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: TaskData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit }) => {
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtaskTitle: "",
    subtasks: [] as Subtask[],
    dueDate: "",
  });

  useEffect(() => {
    // Reset the form data when the form is opened or closed
    if (open) {
      setFormData({
        title: "",
        description: "",
        subtaskTitle: "",
        subtasks: [],
        dueDate: "",
      });
    }
  }, [open]);

  const handlePriorityChange = (
    event: SelectChangeEvent<"low" | "medium" | "high">
  ) => {
    setPriority(event.target.value as "low" | "medium" | "high");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddSubtask = () => {
    if (formData.subtaskTitle.trim() !== "") {
      const newSubtask: Subtask = {
        title: formData.subtaskTitle,
        completed: false,
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        subtasks: [...prevFormData.subtasks, newSubtask],
        subtaskTitle: "",
      }));
    }
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      subtasks: updatedSubtasks,
    }));
  };

  const handleSubmit = () => {
    const newTask: TaskData = {
      id: Math.random().toString(),
      ...formData,
      priority: priority, // Include the priority in the new task
      completed: false,
    };
    onSubmit(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="About Task"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          margin="dense"
        />
        <div>
          {formData.subtasks.map((subtask, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f3e8ff",
                borderRadius: "4px",
                padding: "6px",
                marginBottom: "4px",
              }}
            >
              <span style={{ flex: 1 }}>{subtask.title}</span>
              <IconButton
                onClick={() => handleRemoveSubtask(index)}
                aria-label="remove-subtask"
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
          <TextField
            name="subtaskTitle"
            value={formData.subtaskTitle}
            onChange={handleInputChange}
            label="Subtask Title"
            fullWidth
            margin="dense"
          />
          <Button
            onClick={handleAddSubtask}
            variant="contained"
            color="primary"
          >
            Add Subtask
          </Button>
        </div>
        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: new Date().toISOString().split("T")[0] }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
