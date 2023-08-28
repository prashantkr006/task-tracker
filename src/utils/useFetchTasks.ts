import { useState, useEffect } from "react";
import { getAllTasks } from "../api/api";
import { TaskData } from "./types";
import { useNavigate } from "react-router-dom";

const useFetchTasks = (
  page: number,
  pageSize: number,
  sortBy: string,
  sortOrder: string,
  priorityFilter: string | null,
  statusFilter: string | null,
  keyword: string | null,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
): [TaskData[], React.Dispatch<React.SetStateAction<TaskData[]>>] => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const navigate = useNavigate();

  // Inside the useFetchTasks hook
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks(
          page,
          pageSize,
          sortBy,
          sortOrder,
          priorityFilter,
          statusFilter,
          keyword
        );

        // Sort tasks based on the selected sortBy value
        const sortedTasks = [...response.data.tasks];
        if (sortBy === "dueDate") {
          sortedTasks.sort((a, b) =>
            sortOrder === "asc"
              ? a.dueDate.localeCompare(b.dueDate)
              : b.dueDate.localeCompare(a.dueDate)
          );
        } else if (sortBy === "priority") {
          const priorityOrder: Record<string, number> = {
            low: 1,
            medium: 2,
            high: 3,
          };
          sortedTasks.sort((a, b) => {
            const orderA = priorityOrder[a.priority];
            const orderB = priorityOrder[b.priority];

            if (sortOrder === "asc") {
              return orderA - orderB;
            } else {
              return orderB - orderA;
            }
          });
        }

        // Filter tasks based on the search keyword if it's not null
        const filteredTasks = keyword
          ? sortedTasks.filter(
              (task) =>
                task.title.toLowerCase().includes(keyword.toLowerCase()) ||
                task.description.toLowerCase().includes(keyword.toLowerCase())
            )
          : sortedTasks;

        // Update tasks and totalPages
        setTasks(filteredTasks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        navigate("/");
      }
    };

    fetchTasks();
  }, [
    page,
    pageSize,
    sortBy,
    sortOrder,
    priorityFilter,
    statusFilter,
    keyword,
    setTotalPages,
    navigate,
  ]);

  return [tasks, setTasks];
};

export default useFetchTasks;
