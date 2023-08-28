import React, { useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { TaskData } from "../utils/types";
import Button from "@mui/material/Button";
import CustomPagination from "../components/CustomPagignation";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import SearchInput from "../components/SearchInput";
import { SelectChangeEvent } from "@mui/material";
import { createTasks } from "../api/api";
import useFetchTasks from "../utils/useFetchTasks";
import CreateSuccessDialog from "../components/CreateSuccessDialog";

const Tasks: React.FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const pageSize = 10;
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState(""); // Default sorting by dueDate
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [keyword, setKeyword] = useState(""); // Search term

  // Call useFetchTasks to get tasks and total pages
  const [tasks, setTasks] = useFetchTasks(
    page,
    pageSize,
    sortBy,
    sortOrder,
    priorityFilter,
    statusFilter,
    keyword,
    setTotalPages
  );

  const handlePageChange = (newPage: number) => {
    setpage(newPage);
  };

  const handleCreateTask = async (newTask: TaskData) => {
    try {
      const response = await createTasks(newTask);
      console.log("Created task data:", response);
      // Open the delete success dialog
      setIsCreateDialogOpen(true);
      // Close the dialog after 3 seconds
      setTimeout(() => {
        setIsCreateDialogOpen(false);
      }, 3000);

      // Update the tasks array with the newly created task
      setTasks((prevTasks) => [response.data.task, ...prevTasks]);
    } catch (error: any) {
      console.error("Error creating task:", error.message);
    }
  };

  const handleSort = (event: SelectChangeEvent) => {
    const selectedSortBy = event.target.value as string;

    // Update the sortBy state and reset filters
    setSortBy(selectedSortBy);
    setStatusFilter(null);
    setPriorityFilter(null);
    setpage(1); // Reset to the first page when changing sorting criteria
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    const selectedStatus = event.target.value as string;
    setStatusFilter(selectedStatus);
    setpage(1); // Reset to the first page when changing filters
  };

  const handlePriorityFilterChange = (event: SelectChangeEvent) => {
    const selectedPriority = event.target.value as string;
    setPriorityFilter(selectedPriority);
    setpage(1); // Reset to the first page when changing filters
  };

  const handleUpdateTask = (updatedTask: TaskData) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.taskID === updatedTask.taskID ? updatedTask : task
      );
    });
  };

  const handleDeleteTask = (taskID: number) => {
    // Filter out the deleted task from the tasks array
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== taskID));
  };

  const handleSearchChange = (newKeyword: string) => {
    setKeyword(newKeyword); // Change the state updater function name

    // Reset page to 1 when changing keyword
    setpage(1);
  };

  return (
    <div className="w-screen">
      <div className="sticky top-0 left-0 right-0 bg-white p-4 shadow-lg">
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

        <div
          className="py-4"
          style={{ display: "flex", gap: "1rem", width: "100%" }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="sort-by-select" sx={{ color: "black" }}>
                Sort by
              </InputLabel>
              <Select
                value={sortBy}
                onChange={handleSort}
                labelId="sort-by-select"
                label="Sort by"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>

            <div
              onClick={handleSortOrderChange}
              style={{ cursor: "pointer", marginLeft: "0.5rem" }}
            >
              {sortOrder === "asc" ? (
                <span className="text-2xl font-bold">&uarr;</span>
              ) : (
                <span className="text-2xl font-semibold">&darr;</span>
              )}
            </div>
          </div>

          {/* Custom SearchInput */}
          <SearchInput
            searchQuery={keyword}
            onSearchChange={handleSearchChange}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="status-filter-select" sx={{ color: "black" }}>
              Status
            </InputLabel>
            <Select
              value={statusFilter || ""}
              onChange={handleStatusFilterChange}
              labelId="status-filter-select"
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel
              htmlFor="priority-filter-select"
              sx={{ color: "black" }}
            >
              Priority
            </InputLabel>
            <Select
              value={priorityFilter || ""}
              onChange={handlePriorityFilterChange}
              labelId="priority-filter-select"
              label="Priority"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleCreateTask}
      />
      <div className=" bg-gray-200">
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <div className="sticky left-0 right-0 bottom-0">
        <CustomPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Edit Success Dialog */}
      <CreateSuccessDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        message={"Task Created Successfully"}
      />
    </div>
  );
};

export default Tasks;
