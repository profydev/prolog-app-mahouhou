import { axios } from "./axios";
import { AxiosError } from "axios";
import type { Project } from "./projects.types";

const ENDPOINT = "/project";

export async function getProjects() {
  try {
    const { data } = await axios.get<Project[]>(ENDPOINT);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("Error status:", error.response?.status);
    } else if (error instanceof Error) {
      console.log("Request was made but no response:", error.message);
    } else {
      console.log("Error message:", error);
    }
    throw error;
  }
}
