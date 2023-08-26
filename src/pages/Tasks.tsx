import React, { useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { TaskData } from "../utils/types";
import Button from "@mui/material/Button";
import CustomPagignation from "../components/CustomPagignation";
import { FormControl, Select, MenuItem } from "@mui/material";
import SearchInput from "../components/SearchInput";
import { SelectChangeEvent } from "@mui/material";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [sortBy, setSortBy] = useState(""); // "title", "dueDate", "priority", etc.
  const [searchQuery, setSearchQuery] = useState(""); // Search term

  const handleCreateTask = (newTask: TaskData) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (editedTask: TaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? { ...task, ...editedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  // Sort tasks based on selected criteria
  const sortedTasks = filteredTasks.slice().sort((a, b) => {
    if (sortBy === "dueDate") {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    } else if (sortBy === "priority") {
      // Assign a priority score for each priority level
      const priorityScores = {
        low: 1,
        medium: 2,
        high: 3,
      };
      return priorityScores[a.priority] - priorityScores[b.priority];
    } else {
      // If no sorting criteria selected, maintain the existing order
      return 0;
    }
  });

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-gray-200 h-auto w-screen">
      <div className="sticky top-0 bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Your personal Task tracker</h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
          onClick={() => setIsTaskFormOpen(true)}
          className="mt-2"
        >
          Create Task
        </Button>
      </div>
      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleCreateTask}
      />

      <div className="flex justify-between p-4">
        {/* Sorting dropdown */}
        <FormControl variant="outlined" size="small">
          <Select value={sortBy} onChange={handleSort} label="Sort by">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
        {/* Custom SearchInput */}
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <TaskList
        tasks={currentTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
      <CustomPagignation
        currentPage={currentPage}
        totalPages={Math.ceil(sortedTasks.length / tasksPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Tasks;
