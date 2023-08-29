import axios, { AxiosInstance } from "axios";
import {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  GET_TASKS,
  CREATE_TASKS,
  UPDATE_TASKS,
  DELETE_TASKS,
  SIGNOUT,
} from "./endpoints"; // Import the endpoint constants
import { TaskData } from "../utils/types";

const baseURL = process.env.BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Allow cookies to be sent
});

//auth
export const registerUser = (userData: any) =>
  axiosInstance.post(REGISTER_ENDPOINT, userData); // Use the REGISTER_ENDPOINT constant
export const loginUser = (userData: any) =>
  axiosInstance.post(LOGIN_ENDPOINT, userData); // Use the LOGIN_ENDPOINT constant

//tasks
export const getAllTasks = (
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortOrder?: string,
  priorityFilter?: string | null,
  statusFilter?: string | null,
  keyword?: string | null
) => {
  const params = {
    page,
    pageSize,
    sortBy,
    sortOrder,
    priority: priorityFilter,
    status: statusFilter,
    keyword,
  };

  return axiosInstance.get(GET_TASKS, { params });
};

//tasks/create
export const createTasks = (newTask: TaskData) =>
  axiosInstance.post(CREATE_TASKS, newTask);

//tasks/update
export const updateTask = (editedTask: TaskData) =>
  axiosInstance.put(UPDATE_TASKS + `/${editedTask.taskID}`, editedTask);

//tasks/delete
export const deleteTask = (taskID: number) =>
  axiosInstance.delete(DELETE_TASKS + `/${taskID}`);

//signout
export const signoutUser = () => axiosInstance.get(SIGNOUT);
