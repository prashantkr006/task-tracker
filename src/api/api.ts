import axios, { AxiosInstance } from "axios";
import { REGISTER_ENDPOINT, LOGIN_ENDPOINT } from "./endpoints"; // Import the endpoint constants

const baseURL = "http://localhost:4000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Allow cookies to be sent
});

export const registerUser = (userData: any) =>
  axiosInstance.post(REGISTER_ENDPOINT, userData); // Use the REGISTER_ENDPOINT constant
export const loginUser = (userData: any) =>
  axiosInstance.post(LOGIN_ENDPOINT, userData); // Use the LOGIN_ENDPOINT constant
